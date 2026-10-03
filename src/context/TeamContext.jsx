import { createContext, useContext, useEffect, useState } from "react";
import { initialTeamMembers } from "../data/teamData";

const TeamContext = createContext(null);

const STORAGE_KEY = "taskflow-team-members";

function getStoredMembers() {
  try {
    const storedMembers = localStorage.getItem(STORAGE_KEY);

    if (!storedMembers) {
      return initialTeamMembers;
    }

    const parsedMembers = JSON.parse(storedMembers);

    return Array.isArray(parsedMembers) ? parsedMembers : initialTeamMembers;
  } catch {
    return initialTeamMembers;
  }
}

export function TeamProvider({ children }) {
  const [members, setMembers] = useState(getStoredMembers);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  }, [members]);

  const addMember = (memberData) => {
    const newMember = {
      ...memberData,
      id: `member-${Date.now()}`,
      joinedAt: memberData.joinedAt || new Date().toISOString().split("T")[0],
    };

    setMembers((currentMembers) => [newMember, ...currentMembers]);

    return newMember;
  };

  const updateMember = (memberId, memberData) => {
    setMembers((currentMembers) =>
      currentMembers.map((member) =>
        member.id === memberId
          ? {
              ...member,
              ...memberData,
            }
          : member,
      ),
    );
  };

  const deleteMember = (memberId) => {
    setMembers((currentMembers) =>
      currentMembers.filter((member) => member.id !== memberId),
    );
  };

  const getMemberById = (memberId) => {
    return members.find((member) => member.id === memberId);
  };

  return (
    <TeamContext.Provider
      value={{
        members,
        addMember,
        updateMember,
        deleteMember,
        getMemberById,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeam() {
  const context = useContext(TeamContext);

  if (!context) {
    throw new Error("useTeam must be used inside a TeamProvider");
  }

  return context;
}
