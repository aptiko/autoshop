export const statusName = (status) => {
  switch (status) {
    case 0: return 'Pending';
    case 1: return 'Complete';
    case 2: return 'Approved';
    default: throw new Error('Internal error');
  }
};
