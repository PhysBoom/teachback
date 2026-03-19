import Header from "../components/layout/Header.jsx";
import SessionCard from "../components/ui/session-card/SessionCard.jsx";
import CreateTopicCard from "../components/ui/CreateTopicCard.jsx";
import { useEffect, useState, useContext } from "react";
import Button from "../components/ui/Button.jsx";
import Modal from "../components/ui/Modal.jsx";
import DateTimeInput from "../components/ui/form/DateTimeInput.jsx";
import Field from "../components/ui/form/Field.jsx";
import TextInput from "../components/ui/form/TextInput.jsx";
import TextArea from "../components/ui/form/TextArea.jsx";
import Select from "../components/ui/form/Select.jsx";
import FileInput from "../components/ui/form/FileInput.jsx";
import { AuthContext } from "../contexts/auth/AuthContext.js";

export default function DashboardPage() {
  const [sessions, setSessions] = useState([]);
  const [scheduleSessionModalOpened, setScheduleSessionModalOpened] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("schedulingSession") === "true";
  });
  const [editingSession, setEditingSession] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [meetingLink, setMeetingLink] = useState("");

  const { sendAuthenticatedApiRequest, user } = useContext(AuthContext);

  const durationOptions = [
    { value: "15", label: "15 minutes" },
    { value: "30", label: "30 minutes" },
    { value: "45", label: "45 minutes" },
    { value: "60", label: "1 hour" },
    { value: "90", label: "1.5 hours" },
    { value: "120", label: "2 hours" },
  ];

  async function loadSessions() {
    const sessions = await sendAuthenticatedApiRequest(
      `/api/classes?teacherId=${encodeURIComponent(user.username)}`
    );

    setSessions(sessions);
  }

  async function handleDeleteSession(sessionId) {
    await sendAuthenticatedApiRequest(`/api/classes/${sessionId}`, {
      method: "DELETE",
    });

    await loadSessions();
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Failed to read image file"));
      reader.readAsDataURL(file);
    });
  }

  useEffect(() => {
    loadSessions();
  }, []);

  function handleJoin(session) {
    console.log("CTA clicked:", session.id);
  }

  function resetScheduleForm() {
    setTopic("");
    setTitle("");
    setDescription("");
    setStartTime("");
    setDuration("");
    setMeetingLink("");
    setImageFile(null);
  }

  function handleOpenEdit(session) {
    setEditingSession(session);

    setTitle(session.title ?? "");
    setDescription(session.description ?? "");
    setTopic(Array.isArray(session.topics) ? session.topics.join(", ") : "");
    setStartTime(new Date(session.startTime).toISOString().slice(0, 16));

    const durationMins = Math.round((session.endTime - session.startTime) / 60000);
    setDuration(String(durationMins));

    setMeetingLink(session.meetingLink ?? "");
    setImageFile(null);

    openScheduleModal();
  }

  function closeScheduleModal() {
    if (isSubmitting) return;
    setScheduleSessionModalOpened(false);
  }

  function openScheduleModal() {
    setScheduleSessionModalOpened(true);
  }

  async function handleSubmitSchedule(e) {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const imageDataUrl = imageFile ? await fileToDataUrl(imageFile) : null;

      const payload = {
        topicCsv: topic,
        title,
        description,
        startTime,
        durationMinutes: duration ? Number(duration) : null,
        meetingLink,
      };

      if (imageDataUrl) {
        payload.image = imageDataUrl;
      }

      if (editingSession) {
        await sendAuthenticatedApiRequest(`/api/classes/${editingSession.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } else {
        await sendAuthenticatedApiRequest("/api/classes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      await loadSessions();
      closeScheduleModal();
      resetScheduleForm();
      setEditingSession(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-navy-dark text-slate-900 dark:text-slate-200">
      <Header />

      <div className="bg-white dark:bg-navy-dark border-b border-slate-200 dark:border-slate-800 py-6 mt-4">
        <div className="max-w-[1600px] mx-auto px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 dark:text-white">
            My Classes
          </h1>

          <div className="flex items-center gap-3">
            <Button as="a" to="/classes">
              Find Classes
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {sessions.map((s) => (
              <SessionCard
                key={s.id}
                session={s}
                onCta={() => handleJoin(s)}
                showEditMenu={true}
                onEditClicked={() => handleOpenEdit(s)}
                onDeleteClicked={() => handleDeleteSession(s.id)}
              />
            ))}

            <CreateTopicCard
              title="Schedule New Session"
              description="Pick a topic and invite peers"
              onClick={openScheduleModal}
            />
          </div>
        </div>
      </main>

      <Modal
        title={editingSession ? "Edit Session" : "Schedule a Session"}
        onClose={closeScheduleModal}
        open={scheduleSessionModalOpened}
      >
        <form onSubmit={handleSubmitSchedule} className="space-y-5">
          <Field label="Title">
            <TextInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Intro to Machine Learning"
              required
            />
          </Field>

          <Field label="Description">
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What will you cover? Who is it for?"
              rows={4}
            />
          </Field>

          <Field label="Topic">
            <TextInput
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Algebra, World History, Python"
              required
            />
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Start time">
              <DateTimeInput
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </Field>

            <Field label="Duration">
              <Select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                options={durationOptions}
                placeholder="Select duration"
                required
              />
            </Field>
          </div>

          <Field label="Meeting Link">
            <TextInput
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              placeholder="https://meet.google.com/..."
              required
            />
          </Field>

          <Field label="Image">
            <FileInput
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Optional. Upload a cover image (PNG/JPG).
            </p>
          </Field>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={closeScheduleModal}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? editingSession
                  ? "Saving..."
                  : "Scheduling..."
                : editingSession
                  ? "Save Changes"
                  : "Schedule"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}