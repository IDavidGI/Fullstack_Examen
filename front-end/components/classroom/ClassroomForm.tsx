import { useState } from 'react';
import { useTranslation } from "next-i18next"
import ClassroomService from '@services/ClassroomService';

const ClassroomForm: React.FC = () => {
  const { t } = useTranslation();
  const [classroomName, setClassroomName] = useState('');
  const [validationError, setValidationError] = useState('');
  const [duplicateError, setDuplicateError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    setDuplicateError('');
    setSuccess('');

    if (!classroomName.trim()) {
      setValidationError(t('classroom.validate.name'));
      return;
    }

    try {
      const response = await ClassroomService.createClassroom(classroomName);
      
      if (response.ok) {
        const classroom = await response.json();
        setSuccess(t('classroom.success', { name: classroom.name, id: classroom.id }));
        setClassroomName('');
      } else {
        const errorData = await response.json();
        if (errorData.message && errorData.message.includes('already exists')) {
          setDuplicateError(t('classroom.error.duplicate', { name: classroomName }));
        } else {
          setDuplicateError(t('classroom.error.general'));
        }
      }
    } catch (error) {
      setDuplicateError(t('classroom.error.general'));
    }
  };

  return (
    <div>
      <h1 className="mb-4">{t("classroom.label.add-classroom")}</h1>
      {duplicateError && (
        <div className="text-red-700">
          {duplicateError}
        </div>
      )}
      {success && (
        <div className="text-green-700">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="classroomName" className="block text-gray-700 font-medium mb-2">
            {t("classroom.label.name")}
          </label>
          <input
            type="text"
            id="classroomName"
            value={classroomName}
            onChange={(e) => setClassroomName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          {validationError && (
            <div className="text-red-700">
            {validationError}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
          {t("classroom.button")}
        </button>
      </form>
    </div>
  );
};

export default ClassroomForm;
