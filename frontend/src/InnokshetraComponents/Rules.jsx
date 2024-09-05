import React from "react";

const Rules = () => {
  const rules = [
    {
      title: "Team Composition",
      description:
        "Each team must have 2-4 members. Cross-college and interdisciplinary teams are allowed.",
    },
    {
      title: "Originality",
      description:
        "All submissions must be original and developed during the hackathon. Plagiarism will lead to disqualification.",
    },
    {
      title: "Problem Statement",
      description:
        "Participants are required to define their own problem statement. There are no predefined themes or problem statements provided.",
    },
    {
      title: "Software & Hardware Innovations",
      description:
        "Both software and hardware solutions are accepted. Ensure your project is relevant to innovation in these areas.",
    },
    {
      title: "Use of Existing Tools",
      description:
        "Pre-existing libraries, frameworks, or APIs can be used, but the core solution must be developed during the hackathon.",
    },
    {
      title: "Ethical Standards",
      description:
        "All participants must adhere to ethical guidelines. Solutions should be fair, respectful, and not infringe on any rights.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 bg-slate-900 rounded-xl shadow-2xl">
      <div className="flex items-center justify-center mb-8">
        <h2 className="text-4xl font-extrabold text-center text-white">
          Hackathon Rules
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg border border-cyan-700 transition-all duration-300 hover:shadow-cyan-700/30 hover:-translate-y-1 text-pretty mx-auto"
          >
            <h3 className="text-xl font-bold mb-3 text-cyan-400 ">
              {rule.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">{rule.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rules;
