#ifndef MESSAGE_QUEUE_H
#define MESSAGE_QUEUE_H

#include <deque>
#include <pthread.h>
#include <semaphore.h>
struct Message;

#define QUEUE_MAX 10

// This data type represents a queue of Messages waiting to
// be delivered to a receiver
class MessageQueue {
public:
  MessageQueue();
  ~MessageQueue();

  void enqueue(Message *msg); // will not block
  Message *dequeue();         // blocks for at most a finite amount of time

private:
  // value semantics prohibited
  MessageQueue(const MessageQueue &);
  MessageQueue &operator=(const MessageQueue &);

  // these data members are sufficient to implement the
  // enqueue and dequeue operations: the idea is that the semaphore
  // keeps a count of how many messages are currently in the queue

  pthread_mutex_t m_lock; // must be held while accessing queue
  sem_t m_avail;
  sem_t m_items;
  std::deque<Message *> m_messages;
};

#endif // MESSAGE_QUEUE_H
