import Home from '../pages/Home'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Quiz from '../pages/Quiz'
import randomId from '../utils/randomId'

const routes = [
  {
    path: "/",
    component: Home,
    id: randomId(),
  },
  {
    path: "/login",
    component: Login,
    id: randomId(),
  },
  {
    path: "/profile",
    component: Profile,
    id: randomId(),
    private: true
  },
  {
    path: "/quiz/:id",
    component: Quiz,
    id: randomId(),
  },
];

export default routes
