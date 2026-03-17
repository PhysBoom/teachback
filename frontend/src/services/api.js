function uuidv4() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function makeTeacher(name, avatar) {
  return {
    id: uuidv4(),
    name,
    avatar,
  };
}

function makeSession({ topics, description, image, startOffsetMinutes = 0, durationMinutes = 30, teacher, title, meetingLink }) {
  const startTime = Date.now() + startOffsetMinutes * 60 * 1000;
  const endTime = startTime + durationMinutes * 60 * 1000;
  return {
    id: uuidv4(),
    topics,
    description,
    image,
    startTime,
    endTime,
    teacher,
    title,
    meetingLink: meetingLink ?? `https://meet.google.com/123-efgh-123`
  };
}

// fake database
const _teachers = [
  makeTeacher("Prof. Henderson", "https://lh3.googleusercontent.com/aida-public/AB6AXuAtKoRJvGdeDO9bllNk6BGClcR6SM7dlXw1rch8cXFXsVazBABq-owzNrMCjk5P-BY6nY3Sg8UgRznRLHoxpKT_TJBHIK0aIyrR5grG0Lpo0JQgHhXF-G9q6eliHVWOZGZDvqoDJkpbD9GA_e47FTlNbWaDNWE33Hiomd_XjqLhW2htiL26bGhJQCmqROVfNCYMy1iChZ_taK-5xrhRid8YMhv6rKy0qBRSOoptcLSWM_TyVs6YhdZTMn5Glksx8vn5LNQVPhFU1Aw"),
  makeTeacher("Dr. Alvarez", "https://images.example.com/avatars/alvarez.jpg"),
  makeTeacher("Ms. Nakamura", "https://images.example.com/avatars/nakamura.jpg"),
  makeTeacher("Dr. Aris Thorne", "https://lh3.googleusercontent.com/aida-public/AB6AXuBC12QeJeGmgnrAwbMDxuMG95Oq5FYTDldTpIKuCxwJj5QXUVyRCdvQkLcNfwea3rsr7I1eYZcjVDUIpUscSw6ksZszhv9DKF-VffkidKCbGAjoAFmxIdzyg1ujiBEN5bPigVj5rHQd-zkrvanehpwUMdYmdxAAX5hr7Jv-Mk1BjhHim8yQSl7VVl0yuMXiMi_l8bKlwDwuLvjL4uz64d6psIpbySsxWcll6xLcxeUZdqgJ15lpXDwS2zUzkmLwR_x2BvowZv-lr-A"),
  makeTeacher("Sarah Jenkins", "https://lh3.googleusercontent.com/aida-public/AB6AXuDDLFOdmFtZ4-xYXLQIPUzatBN_-6Qc6pvPoO6MlDRkQBN7YnQX5xFl5uVnaeQR9qT1DbS5vJcWjN97NZpnup2NNm3e2FvD9E82fcbxIYODdAATYJMnuuEGQq0tdMOs53auUD0-UcWmBcObcbqo7rsC1gF4HKbxnRbfDfsJFqnnNEDPUhQaqcs_fhDWUOucsWrgxB8sgG2MtY6Rwk7nh8VuYwQBuqJ8UdFbTXDJ8MKkyVMYsUKW-voya9B_sJJWK0enYbWIjJdv5ak"),
  makeTeacher("Elena Ricci", "https://lh3.googleusercontent.com/aida-public/AB6AXuAiOMo0Qloe2UdteRlopXcAVrHxJ8gwejHMPQ9M9YKnYXsX4w0kk7XTw1BSfV9hF_SIlYxRe4fQJ2myHG_8rVrrTbhUcnh4teiCgt4Qcpp2Rn_7U7h8X4l3gdb-KH8Z05Y6ypPkQdh9ZRKJ8VwwGug87MUGPHPHEX7_KwpNX7GV30B1xWSB7OFPrHoQibteEkg7lZEvApCwjKDChczZ0HwTcFwiZfTAFufrOFhZ3WhI9r-yNhB4ZMsn-rGov-QTH-k_BJ6UFigpW2M"),
  makeTeacher("Julian Voss", "https://lh3.googleusercontent.com/aida-public/AB6AXuBJ7wW9FCK0FdICmT7230EqItBU6iYbwDupAvZvWNRi-gyO3uiMBQDrx31Fyq2-vf0_evO7gbsJE5st1j2EKi4HMNlYDzU7vLfGAmoQ4MqaWPyrPwi_BXJMVvpMWaIc6HRhygZLpyFtHhZJGJNeno3xOIENs-N2o28SJDyLxPszdZ0J0at7K3fNPBEgLo4tVwoOW_2RBJsTwbUpXhsd6tpcWp0OKl3rYOallNoVzyYcNipZUX5k8NznYaJmcqo0a1b0okU8W7Fzhck"),
];

const _sessions = [
  makeSession({
    topics: ["Computer Science", "AI"],
    title: "Intro to Generative AI",
    description:
      "Deep dive into CycleGAN and StyleGAN. Learn by explaining the loss functions to your peers.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJ7wW9FCK0FdICmT7230EqItBU6iYbwDupAvZvWNRi-gyO3uiMBQDrx31Fyq2-vf0_evO7gbsJE5st1j2EKi4HMNlYDzU7vLfGAmoQ4MqaWPyrPwi_BXJMVvpMWaIc6HRhygZLpyFtHhZJGJNeno3xOIENs-N2o28SJDyLxPszdZ0J0at7K3fNPBEgLo4tVwoOW_2RBJsTwbUpXhsd6tpcWp0OKl3rYOallNoVzyYcNipZUX5k8NznYaJmcqo0a1b0okU8W7Fzhck",
    startOffsetMinutes: 120,
    durationMinutes: 90,
    teacher: _teachers.find((t) => t.name === "Dr. Aris Thorne"),
  }),

  makeSession({
    topics: ["AI Mysticism"],
    title: "Can Machines Be Conscious?",
    description:
      "Exploring the philosophical boundaries of machine consciousness and the Turing test.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEsf-lKt0fW5qqTs3SV6UtvorrQZUtteey8SKsndOgcSpyzM_HI10MpteDV7J8coo-XWIdr_ZpIWaKRgo-sJYCSZmFDYuuUz4T1JYP_18dauID1aP9hi3b0IYfNVj-K9BOnR7JlMNzX9Eix2ko2EKN9s8sHNqqhSOIZBPsLRThXp5t2NGXD3egvFNNUfvRpAFW-eV8bOPGif3yEXCDaRJeUAc4tolSgW9RuPig9SDzWgquG0B4tLieLC3fnxXtIcmUeciFRJ2dnrM",
    startOffsetMinutes: -15,
    durationMinutes: 30,
    teacher: _teachers[0],
  }),

  // Quantum Computing (Tomorrow 10:00 AM)
  makeSession({
    topics: ["Physics"],
    title: "Qubits for Everyone",
    description:
      "Explaining qubits through simple analogies. Perfect for those with zero physics background.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAiOMo0Qloe2UdteRlopXcAVrHxJ8gwejHMPQ9M9YKnYXsX4w0kk7XTw1BSfV9hF_SIlYxRe4fQJ2myHG_8rVrrTbhUcnh4teiCgt4Qcpp2Rn_7U7h8X4l3gdb-KH8Z05Y6ypPkQdh9ZRKJ8VwwGug87MUGPHPHEX7_KwpNX7GV30B1xWSB7OFPrHoQibteEkg7lZEvApCwjKDChczZ0HwTcFwiZfTAFufrOFhZ3WhI9r-yNhB4ZMsn-rGov-QTH-k_BJ6UFigpW2M",
    startOffsetMinutes: 720,
    durationMinutes: 60,
    teacher: _teachers.find((t) => t.name === "Sarah Jenkins"),
  }),

  // Behavioral Economics (next Oct 25 at 14:00)
  makeSession({
    topics: ["Psychology"],
    title: "Nudge Theory in Action",
    description:
      "Why we make irrational decisions. Collaborative breakdown of Nudge Theory.",
    image: null,
    startOffsetMinutes: 50000,
    durationMinutes: 90,
    teacher: _teachers.find((t) => t.name === "Elena Ricci"),
  }),

  // Typography (next Oct 26 at 11:00)
  makeSession({
    topics: ["Design"],
    title: "The Art of Typography",
    description:
      "Master hierarchy and readability. Critique session where everyone teaches a rule.",
    image: null,
    startOffsetMinutes: 10000,
    durationMinutes: 45,
    teacher: _teachers.find((t) => t.name === "Julian Voss"),
  }),
];

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); // this is the data URL
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function getSessions(teacherId) {
  let result = _sessions;

  if (teacherId) {
    result = result.filter((s) => s.teacher.id === teacherId);
  }

  // Sort by startTime ascending (earliest first)
  const sorted = [...result].sort(
    (a, b) => a.startTime - b.startTime
  );

  return JSON.parse(JSON.stringify(sorted));
}

export async function listTeachers() {
  return JSON.parse(JSON.stringify(_teachers));
}

export async function deleteSession(sessionId) {
  const index = _sessions.findIndex((s) => s.id === sessionId);
  if (index !== -1) {
    _sessions.splice(index, 1);
    return true;
  }
  return false;
}

export async function createSession({
  teacherId,
  topicCsv,
  title,
  description,
  startTime,
  durationMinutes,
  image, // File | string | null
  meetingLink
}) {
  const teacher =
    _teachers.find((t) => t.id === teacherId) ?? _teachers[0];

  const topics = String(topicCsv ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  // Normalize startTime into timestamp
  const startMs =
    typeof startTime === "number"
      ? startTime
      : startTime instanceof Date
      ? startTime.getTime()
      : new Date(startTime).getTime();

  const durationMinsNum = Number(durationMinutes) || 30;
  const endMs = startMs + durationMinsNum * 60 * 1000;

  let imageValue = null;

  if (image instanceof File) {
    imageValue = await fileToBase64(image);
  } else if (typeof image === "string") {
    imageValue = image; // already a URL or base64
  }

  const newSession = {
    id: uuidv4(),
    topics,
    title: title ?? "",
    description: description ?? "",
    image: imageValue,
    startTime: startMs,
    endTime: endMs,
    teacher,
    meetingLink
  };

  _sessions.push(newSession);

  return JSON.parse(JSON.stringify(newSession));
}

export async function editSession(sessionId, {
  teacherId,
  topicCsv,
  title,
  description,
  startTime, // number | Date | string
  durationMinutes,
  image, // File | string | null | undefined
  meetingLink
} = {}) {
  const index = _sessions.findIndex((s) => s.id === sessionId);
  if (index === -1) return null;

  const existing = _sessions[index];

  // Teacher (optional)
  const teacher =
    teacherId != null
      ? _teachers.find((t) => t.id === teacherId) ?? existing.teacher
      : existing.teacher;

  // Topics (CSV only)
  const nextTopics =
    topicCsv != null
      ? String(topicCsv)
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : existing.topics;

  // Start time (optional)
  const startMs =
    startTime != null
      ? typeof startTime === "number"
        ? startTime
        : startTime instanceof Date
        ? startTime.getTime()
        : new Date(startTime).getTime()
      : existing.startTime;

  // Duration (optional)
  const durationMins =
    durationMinutes != null
      ? Number(durationMinutes) || 30
      : Math.round((existing.endTime - existing.startTime) / 60000);

  const endMs = startMs + durationMins * 60 * 1000;

  // Image (optional)
  let imageValue = existing.image;
  if (image !== undefined) {
    if (image === null) {
      imageValue = null; // clear image
    } else if (image instanceof File) {
      imageValue = await fileToBase64(image);
    } else if (typeof image === "string") {
      imageValue = image;
    }
  }

  const updated = {
    ...existing,
    teacher,
    topics: nextTopics,
    title: title != null ? String(title) : existing.title,
    description: description != null ? String(description) : existing.description,
    image: imageValue ?? existing.image,
    startTime: startMs,
    endTime: endMs,
    meetingLink: meetingLink ?? existing.meetingLink
  };

  _sessions[index] = updated;

  return JSON.parse(JSON.stringify(updated));
}