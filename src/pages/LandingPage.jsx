import React from "react";
import SiteShell from "../components/layout/SiteShell.jsx";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import Section from "../components/layout/Section.jsx";

import Button from "../components/ui/Button.jsx";
import Card from "../components/ui/Card.jsx";
import Icon from "../components/ui/Icon.jsx";
import AvatarStack from "../components/ui/AvatarStack.jsx";

function Pill({ label }) {
  return (
    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full w-fit">
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      <span className="text-primary font-semibold uppercase text-[10px] tracking-widest">
        {label}
      </span>
    </div>
  );
}

function StatTile({ tone = "primary", label, value, sublabel }) {
  const toneClasses =
    tone === "orange" ? "hover:border-accent-orange/40" : "hover:border-primary/40";
  const labelTone = tone === "orange" ? "text-accent-orange" : "text-primary";

  return (
    <Card className={`bg-navy-dark/40 p-8 border-slate-800/50 ${toneClasses}`}>
      <p className={`${labelTone} font-bold uppercase tracking-wider text-[10px] mb-2`}>
        {label}
      </p>
      <p className="text-white text-4xl font-bold tracking-tight">{value}</p>
      <p className="text-slate-500 font-medium mt-1 text-sm">{sublabel}</p>
    </Card>
  );
}

function FeatureCard({ icon, iconWrapClassName, title, description }) {
  return (
    <Card className="bg-white p-8 border-slate-200 rounded-2xl hover:shadow-lg transition-shadow">
      <div className={`w-14 h-14 flex items-center justify-center mb-6 rounded-xl ${iconWrapClassName}`}>
        <Icon name={icon} className="text-3xl" />
      </div>
      <h3 className="text-xl font-bold tracking-tight mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
    </Card>
  );
}

export default function LandingPage() {
  const avatars = [
    {
      alt: "User 1",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC12QeJeGmgnrAwbMDxuMG95Oq5FYTDldTpIKuCxwJj5QXUVyRCdvQkLcNfwea3rsr7I1eYZcjVDUIpUscSw6ksZszhv9DKF-VffkidKCbGAjoAFmxIdzyg1ujiBEN5bPigVj5rHQd-zkrvanehpwUMdYmdxAAX5hr7Jv-Mk1BjhHim8yQSl7VVl0yuMXiMi_l8bKlwDwuLvjL4uz64d6psIpbySsxWcll6xLcxeUZdqgJ15lpXDwS2zUzkmLwR_x2BvowZv-lr-A",
    },
    {
      alt: "User 2",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJ7wW9FCK0FdICmT7230EqItBU6iYbwDupAvZvWNRi-gyO3uiMBQDrx31Fyq2-vf0_evO7gbsJE5st1j2EKi4HMNlYDzU7vLfGAmoQ4MqaWPyrPwi_BXJMVvpMWaIc6HRhygZLpyFtHhZJGJNeno3xOIENs-N2o28SJDyLxPszdZ0J0at7K3fNPBEgLo4tVwoOW_2RBJsTwbUpXhsd6tpcWp0OKl3rYOallNoVzyYcNipZUX5k8NznYaJmcqo0a1b0okU8W7Fzhck",
    },
    {
      alt: "User 3",
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDLFOdmFtZ4-xYXLQIPUzatBN_-6Qc6pvPoO6MlDRkQBN7YnQX5xFl5uVnaeQR9qT1DbS5vJcWjN97NZpnup2NNm3e2FvD9E82fcbxIYODdAATYJMnuuEGQq0tdMOs53auUD0-UcWmBcObcbqo7rsC1gF4HKbxnRbfDfsJFqnnNEDPUhQaqcs_fhDWUOucsWrgxB8sgG2MtY6Rwk7nh8VuYwQBuqJ8UdFbTXDJ8MKkyVMYsUKW-voya9B_sJJWK0enYbWIjJdv5ak",
    },
  ];

  return (
    <SiteShell>
      <Header />

      <main className="flex-1">
        <Section className="py-16 md:py-28" containerClassName="max-w-[1200px]">
          <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
            <div className="flex flex-col gap-10 lg:w-1/2">
              <div className="flex flex-col gap-6">
                <Pill label="Collaborative Learning" />
                <h1 className="text-white text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                  Learn deeper by <span className="text-primary italic">teaching</span> others.
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                  Master any subject using the Feynman Technique. Join a supportive global
                  community where teaching and learning go hand in hand.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="md" variant="primary" className="min-w-[200px]">
                  Get Started Free
                </Button>
                <Button size="md" variant="secondary" className="min-w-[200px]">
                  Explore Topics
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-slate-800/50">
                <AvatarStack users={avatars} />
                <p className="text-sm font-medium text-slate-400">
                  <span className="text-primary font-bold">12K+</span> learners already growing
                </p>
              </div>
            </div>

            <div className="lg:w-1/2 relative group">
              <div className="absolute -inset-2 bg-primary/5 -rotate-2 z-0 rounded-2xl" />
              <div className="aspect-[4/5] md:aspect-[4/3] relative z-10 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  className="w-full h-full object-cover transition-all duration-700"
                  alt="Students learning"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiOMo0Qloe2UdteRlopXcAVrHxJ8gwejHMPQ9M9YKnYXsX4w0kk7XTw1BSfV9hF_SIlYxRe4fQJ2myHG_8rVrrTbhUcnh4teiCgt4Qcpp2Rn_7U7h8X4l3gdb-KH8Z05Y6ypPkQdh9ZRKJ8VwwGug87MUGPHPHEX7_KwpNX7GV30B1xWSB7OFPrHoQibteEkg7lZEvApCwjKDChczZ0HwTcFwiZfTAFufrOFhZ3WhI9r-yNhB4ZMsn-rGov-QTH-k_BJ6UFigpW2M"
                />
                <div className="absolute inset-0 bg-navy-deep/20" />
              </div>

              <div className="absolute -bottom-6 -right-4 bg-navy-dark text-white p-5 border border-slate-800 shadow-xl z-20 rounded-xl">
                <div className="flex items-center gap-3">
                  <Icon name="groups" className="text-3xl text-primary" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider leading-none mb-1">
                      Active Peers
                    </p>
                    <p className="text-2xl font-bold tracking-tight">2,480+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32">
            <StatTile label="Growth" value="50K+" sublabel="Community Members" />
            <StatTile tone="orange" label="Breadth" value="200+" sublabel="Learning Circles" />
            <StatTile label="Quality" value="4.9/5" sublabel="Session Rating" />
          </div>
        </Section>

        <Section className="py-24 bg-slate-50 text-navy-deep">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
                Learning is a <span className="text-primary">shared journey.</span>
              </h2>
              <p className="text-lg font-medium text-slate-600">
                Our approach focuses on clarity, communication, and mutual growth.
              </p>
            </div>
            <div className="hidden md:block">
              <Icon name="all_inclusive" className="text-7xl text-slate-200 font-thin" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="lightbulb"
              iconWrapClassName="bg-accent-lime/30 text-accent-orange"
              title="Simplify Together"
              description="The best way to understand is to explain. We help you break down complex ideas for your peers."
            />
            <FeatureCard
              icon="chat_bubble"
              iconWrapClassName="bg-accent-coral/30 text-accent-coral"
              title="Supportive Feedback"
              description="Growth happens through kind, constructive loops. Learn to give and receive meaningful insight."
            />
            <FeatureCard
              icon="auto_graph"
              iconWrapClassName="bg-primary/10 text-primary"
              title="Open Pathways"
              description="Whether you're starting out or advancing, find a group that matches your pace and passion."
            />
          </div>
        </Section>

        <section className="px-6 py-24">
          <div className="max-w-[1000px] mx-auto bg-navy-dark border border-slate-800 relative overflow-hidden p-10 md:p-20 rounded-3xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 text-center flex flex-col items-center gap-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-2xl">
                Ready to grow with a community that <span className="italic text-primary">teaches</span>?
              </h2>
              <p className="text-slate-400 text-lg font-medium max-w-xl">
                Join thousands of students and lifelong learners who believe in the power of collaborative mastery.
              </p>

              <Button size="lg" variant="primary">
                Join the Community
              </Button>

              <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest">
                Always free to get started • No credit card required
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </SiteShell>
  );
}