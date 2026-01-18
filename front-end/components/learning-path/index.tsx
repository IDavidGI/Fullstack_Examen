import TeacherService from '@services/TeacherService';
import { useState } from 'react';

type Props = {
  teacherId: number;
  learningPath: string;
};

const LearningPath: React.FC<Props> = ({ teacherId, learningPath }: Props) => {
  const [currentLearningPath, setCurrentLearningPath] = useState(learningPath);

  const handleLearningPathChange = async (event: { target: { value: string } }) => {
    {/* Use TeacherService to update the learning path for the teacher */}
    const newLearningPath = event.target.value;
    setCurrentLearningPath(newLearningPath);
    
    try {
      const response = await TeacherService.updateLearningPath(teacherId, newLearningPath);
      if (!response.ok) {
        console.error('Failed to update learning path');
        setCurrentLearningPath(learningPath);
      }
    } catch (error) {
      console.error('Error updating learning path:', error);
      setCurrentLearningPath(learningPath);
    }
  };

  return (
    <div className="ml-6">
      <select 
        id="learningPath" 
        className="ml-2 p-1" 
        value={currentLearningPath}
        onChange={handleLearningPathChange}
      >
        <option value="Infrastructure">Infrastructure</option>
        <option value="Software development">Software development</option>
        <option value="Cybersecurity">Cybersecurity</option>
      </select>
    </div>
  );
};

export default LearningPath;
