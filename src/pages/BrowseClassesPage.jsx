import React, { useMemo, useState } from "react";
import Header from "../components/layout/Header";
import BrowseHero from "../components/ui/browse/BrowseHero";
import SessionsSection from "../components/ui/browse/SessionsSection";
import Footer from "../components/layout/Footer";

export default function BrowseClassesPage() {
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState("All Topics");

  const topics = useMemo(
    () => ["All Topics", "Science", "Technology", "Humanities", "Business", "Design"],
    []
  );

  const sessions = useMemo(
    () => [
      {
        id: "gan",
        topic: "Computer Science",
        dateLabel: "Today, 4:00 PM",
        title: "Advanced GAN Models: Beyond Basic Architectures",
        description:
          "Deep dive into CycleGAN and StyleGAN. Learn by explaining the loss functions to your peers.",
        teacher: { name: "Dr. Aris Thorne", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC12QeJeGmgnrAwbMDxuMG95Oq5FYTDldTpIKuCxwJj5QXUVyRCdvQkLcNfwea3rsr7I1eYZcjVDUIpUscSw6ksZszhv9DKF-VffkidKCbGAjoAFmxIdzyg1ujiBEN5bPigVj5rHQd-zkrvanehpwUMdYmdxAAX5hr7Jv-Mk1BjhHim8yQSl7VVl0yuMXiMi_l8bKlwDwuLvjL4uz64d6psIpbySsxWcll6xLcxeUZdqgJ15lpXDwS2zUzkmLwR_x2BvowZv-lr-A" },
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBJ7wW9FCK0FdICmT7230EqItBU6iYbwDupAvZvWNRi-gyO3uiMBQDrx31Fyq2-vf0_evO7gbsJE5st1j2EKi4HMNlYDzU7vLfGAmoQ4MqaWPyrPwi_BXJMVvpMWaIc6HRhygZLpyFtHhZJGJNeno3xOIENs-N2o28SJDyLxPszdZ0J0at7K3fNPBEgLo4tVwoOW_2RBJsTwbUpXhsd6tpcWp0OKl3rYOallNoVzyYcNipZUX5k8NznYaJmcqo0a1b0okU8W7Fzhck",
        cta: { type: "join", label: "Join Session" },
      },
      {
        id: "quantum",
        topic: "Physics",
        dateLabel: "Tomorrow, 10:00 AM",
        title: "Quantum Computing for Absolute Beginners",
        description:
          "Explaining qubits through simple analogies. Perfect for those with zero physics background.",
        teacher: { name: "Sarah Jenkins", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDLFOdmFtZ4-xYXLQIPUzatBN_-6Qc6pvPoO6MlDRkQBN7YnQX5xFl5uVnaeQR9qT1DbS5vJcWjN97NZpnup2NNm3e2FvD9E82fcbxIYODdAATYJMnuuEGQq0tdMOs53auUD0-UcWmBcObcbqo7rsC1gF4HKbxnRbfDfsJFqnnNEDPUhQaqcs_fhDWUOucsWrgxB8sgG2MtY6Rwk7nh8VuYwQBuqJ8UdFbTXDJ8MKkyVMYsUKW-voya9B_sJJWK0enYbWIjJdv5ak" },
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAiOMo0Qloe2UdteRlopXcAVrHxJ8gwejHMPQ9M9YKnYXsX4w0kk7XTw1BSfV9hF_SIlYxRe4fQJ2myHG_8rVrrTbhUcnh4teiCgt4Qcpp2Rn_7U7h8X4l3gdb-KH8Z05Y6ypPkQdh9ZRKJ8VwwGug87MUGPHPHEX7_KwpNX7GV30B1xWSB7OFPrHoQibteEkg7lZEvApCwjKDChczZ0HwTcFwiZfTAFufrOFhZ3WhI9r-yNhB4ZMsn-rGov-QTH-k_BJ6UFigpW2M",
        cta: { type: "countdown", label: "14h : 22m" },
      },
      {
        id: "behavioral-econ",
        topic: "Psychology",
        dateLabel: "Oct 25, 2:00 PM",
        title: "Behavioral Economics 101",
        description:
          "Why we make irrational decisions. Collaborative breakdown of Nudge Theory.",
        teacher: { name: "Elena Ricci", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiOMo0Qloe2UdteRlopXcAVrHxJ8gwejHMPQ9M9YKnYXsX4w0kk7XTw1BSfV9hF_SIlYxRe4fQJ2myHG_8rVrrTbhUcnh4teiCgt4Qcpp2Rn_7U7h8X4l3gdb-KH8Z05Y6ypPkQdh9ZRKJ8VwwGug87MUGPHPHEX7_KwpNX7GV30B1xWSB7OFPrHoQibteEkg7lZEvApCwjKDChczZ0HwTcFwiZfTAFufrOFhZ3WhI9r-yNhB4ZMsn-rGov-QTH-k_BJ6UFigpW2M" },
        image: null,
        icon: "psychology",
        cta: { type: "join", label: "Join Session" },
      },
      {
        id: "typography",
        topic: "Design",
        dateLabel: "Oct 26, 11:00 AM",
        title: "Typography in Interface Design",
        description:
          "Master hierarchy and readability. Critique session where everyone teaches a rule.",
        teacher: { name: "Julian Voss", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJ7wW9FCK0FdICmT7230EqItBU6iYbwDupAvZvWNRi-gyO3uiMBQDrx31Fyq2-vf0_evO7gbsJE5st1j2EKi4HMNlYDzU7vLfGAmoQ4MqaWPyrPwi_BXJMVvpMWaIc6HRhygZLpyFtHhZJGJNeno3xOIENs-N2o28SJDyLxPszdZ0J0at7K3fNPBEgLo4tVwoOW_2RBJsTwbUpXhsd6tpcWp0OKl3rYOallNoVzyYcNipZUX5k8NznYaJmcqo0a1b0okU8W7Fzhck" },
        image: null,
        icon: "palette",
        cta: { type: "countdown", label: "2d : 03h" },
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sessions.filter((s) => {
      const matchesTopic =
        activeTopic === "All Topics" ? true : s.topic.toLowerCase() === activeTopic.toLowerCase();
      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.topic.toLowerCase().includes(q);
      return matchesTopic && matchesQuery;
    });
  }, [sessions, query, activeTopic]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50">
      <Header />

      <main className="flex-1">
        <BrowseHero
          query={query}
          onQueryChange={setQuery}
          onSearch={() => {}}
          topics={topics}
          activeTopic={activeTopic}
          onTopicChange={setActiveTopic}
        />

        <SessionsSection
          title="Upcoming Sessions"
          badge="Live Now"
          sessions={filtered}
          onFilterClick={() => console.log("filter")}
          onCta={(session) => console.log("CTA:", session.id)}
          onCreateTopic={() => console.log("create topic")}
        />
      </main>

      <Footer />
    </div>
  );
}