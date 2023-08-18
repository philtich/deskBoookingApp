import Header from '../common/Header';
import Sidebar from '../common/Sidebar';
import Footer from '../common/Footer';
import { useGetProfile } from '../../Hooks/ProfileHooks/useGetProfile';
import { AdminDashboard } from './AdminDashboard';
import { UserDashboard } from './UserDashboard';

export const Dashboard = () => {
  const { data } = useGetProfile();
  const pageTitle = data?.isAdmin === true ? 'Admin Dashboard' : 'User Dashboard';
  
  return (
    <main>
      {/* sidenav   */}
      <Sidebar />
      {/* End sidenav */}
      <div className="dashMain">
        {/* Header */}
        <Header pageTitle={pageTitle} />
        {/* Header */}
        { data?.isAdmin === true ? <AdminDashboard/> : <UserDashboard/>}
        {/* Footer */}
        <Footer />
        {/* Footer */}
      </div>
    </main>
  )
}

export default Dashboard;
