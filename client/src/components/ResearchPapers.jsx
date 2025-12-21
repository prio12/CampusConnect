const ResearchPapers = ({ colleges }) => {
  const allPapers = colleges.flatMap((college) => college.researchPapers || []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold text-textPrimary mb-6">
        Recent Research Papers
      </h2>
      <ul className="space-y-2">
        {allPapers.map((paper) => (
          <li key={paper._id}>
            <a
              href={paper.link}
              className="text-primary hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {paper.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ResearchPapers;
