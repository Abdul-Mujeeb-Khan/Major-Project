import React, { createContext, useState, useContext } from 'react';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [finishedProjects, setFinishedProjects] = useState([]);

  const addFinishedProject = (project) => {
    setFinishedProjects(current => [{
      ...project,
      completedDate: new Date().toISOString(),
    }, ...current]);
  };

  return (
    <ProjectContext.Provider value={{ finishedProjects, addFinishedProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext); 