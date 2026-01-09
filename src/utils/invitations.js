export function generateInvitation(owner) {
  const invitations =
    JSON.parse(localStorage.getItem("chatInvitations")) || [];

  const id = crypto.randomUUID();

  const invitation = {
    id,
    ownerId: owner.id,
    ownerName: owner.nickname,
    used: false,
    createdAt: Date.now(),
  };

  invitations.push(invitation);
  localStorage.setItem("chatInvitations", JSON.stringify(invitations));

  return `${window.location.origin}${window.location.pathname}#/invite/${id}`;
}
