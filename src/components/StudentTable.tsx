import React from 'react';
import { Trash2, User, Mail, BookOpen, Award } from 'lucide-react';
import { Student } from '../api';
import { motion, AnimatePresence } from 'motion/react';

interface StudentTableProps {
  students: Student[];
  onDelete: (id: number) => void;
  loading: boolean;
}

export const StudentTable: React.FC<StudentTableProps> = ({ students, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-bottom border-gray-200">
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">ID</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Student</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Department</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Marks</th>
            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider italic font-serif">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <AnimatePresence mode="popLayout">
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  No student records found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <motion.tr
                  key={student.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4 font-mono text-sm text-gray-400">#{student.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {student.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      {student.department}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span className="font-mono font-semibold text-gray-900">{student.marks}</span>
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${student.marks >= 75 ? 'bg-green-500' : student.marks >= 40 ? 'bg-blue-500' : 'bg-red-500'}`}
                          style={{ width: `${student.marks}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onDelete(student.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg transition-all"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};
