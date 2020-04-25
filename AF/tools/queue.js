let queue = [];
let canExecute = true;
let blocked = [];

export const executeJob = detail => {
  if (detail && detail.start) {
    if (detail.blocked && blocked.includes(detail.blocked)) {
      return;
    } else if (detail.id) {
      blocked.push(detail.id);
    }

    queue.push(detail);
    canExecute && pushTail();
  } else {
    console.log('task not valid');
  }
};

const pushTail = () => {
  canExecute = false;

  if (queue.length === 0) {
    canExecute = true;
    return;
  }

  const firstTask = queue.shift();

  firstTask.start(() => {
    if (firstTask.id) {
      blocked = blocked.filter(e => {
        return e !== firstTask.id;
      });
    }

    pushTail();
  });

  firstTask.parallel && firstTask.parallel();
};

export default executeJob;
