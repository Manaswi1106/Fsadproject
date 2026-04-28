import { useState, useEffect, useCallback } from 'react';
import { GraduationCap, LayoutDashboard, Database, RefreshCw } from 'lucide-react';
import { studentApi, Student, DepartmentCount } from './api';
import { StudentForm } from './components/StudentForm';
import { StudentTable } from './components/StudentTable';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { SearchFilter } from './components/SearchFilter';
import { Pagination } from './components/Pagination';
import { motion } from 'motion/react';

export default function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageMarks, setAverageMarks] = useState(0);
  const [departmentCounts, setDepartmentCounts] = useState<DepartmentCount>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(5);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch paginated students by default
      const data = await studentApi.getPage(currentPage, pageSize);
     setStudents(data.content);

      // Fetch analytics
      const avg = await studentApi.getAverageMarks();
      const counts = await studentApi.getDepartmentCounts();
      setAverageMarks(avg);
      setDepartmentCounts(counts);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = async (name: string) => {
    setLoading(true);
    try {
      const results = await studentApi.search(name);
      setStudents(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async (min: number, max: number) => {
    setLoading(true);
    try {
      const results = await studentApi.filter(min, max);
      setStudents(results);
    } catch (error) {
      console.error('Filter failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await studentApi.delete(id);
      fetchData(); // Refresh all data
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleStudentAdded = () => {
    fetchData();
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">EduAnalytics</h1>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Smart Student Records</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => fetchData()}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              title="Refresh Data"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="h-8 w-px bg-gray-200 mx-2" />
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-gray-600">Backend Connected</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column: Analytics & Form */}
          <div className="xl:col-span-4 space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-4">
                <LayoutDashboard className="w-4 h-4 text-blue-600" />
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Quick Stats</h2>
              </div>
              <AnalyticsDashboard 
                averageMarks={averageMarks}
                departmentCounts={departmentCounts}
                totalStudents={students.length}
              />
            </section>

            <section>
              <div className="flex items-center gap-2 mb-4">
                <Database className="w-4 h-4 text-blue-600" />
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Data Entry</h2>
              </div>
              <StudentForm onStudentAdded={handleStudentAdded} />
            </section>
          </div>

          {/* Right Column: Table & Controls */}
          <div className="xl:col-span-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600" />
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Student Directory</h2>
              </div>
              <div className="text-xs text-gray-400 italic font-serif">
                Showing {students.length} records
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SearchFilter 
                onSearch={handleSearch}
                onFilter={handleFilter}
                onReset={fetchData}
              />
              
              <StudentTable 
                students={students}
                onDelete={handleDelete}
                loading={loading}
              />

              <Pagination 
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                totalItems={students.length}
              />
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400 font-mono">
            &copy; 2026 EduAnalytics System &bull; Built with React & Tailwind &bull; Spring Boot Backend
          </p>
        </div>
      </footer>
    </div>
  );
}
