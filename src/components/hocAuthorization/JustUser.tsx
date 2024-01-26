import { useAuth } from '@/hooks/context/useAuth'
import { Outlet } from 'react-router-dom';
const JustUser = () => {
    const { auth } = useAuth();
    console.log(auth.role)
    return auth.role === "user" ? <Outlet /> : <p>You are not authorized</p>;
}

export default JustUser