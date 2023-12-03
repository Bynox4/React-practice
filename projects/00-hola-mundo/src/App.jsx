import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";

const users = [
  {
    userName: '_bynox',
    name: 'Nelson_Developer',
    isFollowing: true,
  },
  {
    userName: 'WalfreDinac',
    name: 'WalfreD ඞ',
    isFollowing: false,
  },
  {
    userName: 'ObvioescineSi',
    name: 'SI ES CINE',
    isFollowing: false,
  },
]

export function App() {
  return (
    <seccion className="App">
      {
        users.map(({ userName, name, isFollowing }) => (
            <TwitterFollowCard 
              userName={userName}
              initialIsFollowing={isFollowing}
              key={userName}
              >
              {name}
            </TwitterFollowCard>
          ))
      }
    </seccion>
  );
}
