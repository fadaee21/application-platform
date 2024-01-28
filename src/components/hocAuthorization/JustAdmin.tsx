import { useAuth } from '@/hooks/context/useAuth'
import { Outlet } from 'react-router-dom';
const JustAdmin = () => {
    const { auth } = useAuth();
    console.log(auth)
    return auth?.role === "admin" ? <Outlet /> : <p>You are not authorized</p>;
}

export default JustAdmin