import Header from "../components/layout/Header.jsx";
import SessionCard from "../components/ui/session-card/SessionCard.jsx";
import CreateTopicCard from "../components/ui/CreateTopicCard.jsx";
import { useEffect, useState } from "react";
import { listTeachers, getSessions, createSession, deleteSession, editSession } from "../services/api.js";
import Button from "../components/ui/Button.jsx";
import Modal from "../components/ui/Modal.jsx";
import DateTimeInput from "../components/ui/form/DateTimeInput.jsx";
import Field from "../components/ui/form/Field.jsx";
import TextInput from "../components/ui/form/TextInput.jsx";
import TextArea from "../components/ui/form/TextArea.jsx";
import Select from "../components/ui/form/Select.jsx";
import FileInput from "../components/ui/form/FileInput.jsx";

export default function DashboardPage() {
  const [sessions, setSessions] = useState([]);
  const [scheduleSessionModalOpened, setScheduleSessionModalOpened] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("schedulingSession") === "true";
  });
  const [editingSession, setEditingSession] = useState(null);

  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [meetingLink, setMeetingLink] = useState("");  

  const durationOptions = [
      { value: "15", label: "15 minutes" },
      { value: "30", label: "30 minutes" },
      { value: "45", label: "45 minutes" },
      { value: "60", label: "1 hour" },
      { value: "90", label: "1.5 hours" },
      { value: "120", label: "2 hours" },
  ]

  async function loadSessions() {
    const teachers = await listTeachers();
    const me = teachers[0]; // hardcoded "logged in" teacher

    const sessions = await getSessions(me.id);
    setSessions(sessions);
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
    setEditingSession(session); // store whole session for prefilling + id

    setTitle(session.title ?? "");
    setDescription(session.description ?? "");
    setTopic(Array.isArray(session.topics) ? session.topics.join(", ") : "");
    setStartTime(new Date(session.startTime).toISOString().slice(0, 16)); 
    // ^ works for <input type="datetime-local"> style values

    const durationMins = Math.round((session.endTime - session.startTime) / 60000);
    setDuration(String(durationMins));

    setMeetingLink(session.meetingLink ?? "");
    setImageFile(null); // don't prefill File input; keep existing image unless user picks a new one

    openScheduleModal();
  }

  function closeScheduleModal() {
    setScheduleSessionModalOpened(false);
  }

  function openScheduleModal() {
    setScheduleSessionModalOpened(true);
  }

  async function handleSubmitSchedule(e) {
    e.preventDefault();

    if (editingSession) {
        await editSession(editingSession.id, {
          topicCsv: topic,
          title,
          description,
          startTime,
          durationMinutes: duration ? Number(duration) : null,
          image: imageFile, // undefined means "no change" — but you pass null sometimes; see note below
          meetingLink,
        });
    } else {
      await createSession({
        topicCsv: topic,
        title,
        description,
        startTime,
        durationMinutes: duration ? Number(duration) : null,
        image: imageFile,
        meetingLink,
      });
    }

    await loadSessions();
    closeScheduleModal();
    resetScheduleForm();
    setEditingSession(null);
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
                onDeleteClicked={async (sessionId) => {
                  await deleteSession(sessionId);
                  await loadSessions();
                }}
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

      <Modal title={editingSession ? "Edit Session" : "Schedule a Session"} onClose={closeScheduleModal} open={scheduleSessionModalOpened}>
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
            <Button type="button" variant="secondary" onClick={closeScheduleModal}>
              Cancel
            </Button>
            <Button type="submit">Schedule</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}