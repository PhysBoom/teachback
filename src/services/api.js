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

function makeSession({ topic, description, image, startOffsetMinutes = 0, durationMinutes = 30, teacher }) {
  const startTime = Date.now() + startOffsetMinutes * 60 * 1000;
  const endTime = startTime + durationMinutes * 60 * 1000;
  return {
    id: uuidv4(),
    topic,
    description,
    image,
    startTime,
    endTime,
    teacher,
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
    topic: "Computer Science",
    description:
      "Deep dive into CycleGAN and StyleGAN. Learn by explaining the loss functions to your peers.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJ7wW9FCK0FdICmT7230EqItBU6iYbwDupAvZvWNRi-gyO3uiMBQDrx31Fyq2-vf0_evO7gbsJE5st1j2EKi4HMNlYDzU7vLfGAmoQ4MqaWPyrPwi_BXJMVvpMWaIc6HRhygZLpyFtHhZJGJNeno3xOIENs-N2o28SJDyLxPszdZ0J0at7K3fNPBEgLo4tVwoOW_2RBJsTwbUpXhsd6tpcWp0OKl3rYOallNoVzyYcNipZUX5k8NznYaJmcqo0a1b0okU8W7Fzhck",
    startOffsetMinutes: 120,
    durationMinutes: 90,
    teacher: _teachers.find((t) => t.name === "Dr. Aris Thorne"),
  }),

  // AI Mysticism (existing)
  makeSession({
    topic: "AI Mysticism",
    description:
      "Exploring the philosophical boundaries of machine consciousness and the Turing test.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDEsf-lKt0fW5qqTs3SV6UtvorrQZUtteey8SKsndOgcSpyzM_HI10MpteDV7J8coo-XWIdr_ZpIWaKRgo-sJYCSZmFDYuuUz4T1JYP_18dauID1aP9hi3b0IYfNVj-K9BOnR7JlMNzX9Eix2ko2EKN9s8sHNqqhSOIZBPsLRThXp5t2NGXD3egvFNNUfvRpAFW-eV8bOPGif3yEXCDaRJeUAc4tolSgW9RuPig9SDzWgquG0B4tLieLC3fnxXtIcmUeciFRJ2dnrM",
    startOffsetMinutes: 15, // 15 minutes from now
    durationMinutes: 30,
    teacher: _teachers[0],
  }),

  // Quantum Computing (Tomorrow 10:00 AM)
  makeSession({
    topic: "Physics",
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
    topic: "Psychology",
    description:
      "Why we make irrational decisions. Collaborative breakdown of Nudge Theory.",
    image: null,
    startOffsetMinutes: 50000,
    durationMinutes: 90,
    teacher: _teachers.find((t) => t.name === "Elena Ricci"),
  }),

  // Typography (next Oct 26 at 11:00)
  makeSession({
    topic: "Design",
    description:
      "Master hierarchy and readability. Critique session where everyone teaches a rule.",
    image: null,
    startOffsetMinutes: 10000,
    durationMinutes: 45,
    teacher: _teachers.find((t) => t.name === "Julian Voss"),
  }),
];

export async function getSessions(teacherId) {
  if (teacherId) {
    const filtered = _sessions.filter(
      (s) => s.teacher.id === teacherId
    );

    return JSON.parse(JSON.stringify(filtered));
  }

  return JSON.parse(JSON.stringify(_sessions));
}

export async function listTeachers() {
  return JSON.parse(JSON.stringify(_teachers));
}