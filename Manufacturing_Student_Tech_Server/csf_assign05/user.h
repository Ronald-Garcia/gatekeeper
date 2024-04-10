#ifndef USER_H
#define USER_H

#include <string>
#include "message_queue.h"


#define MILL 0b001
#define LATHE 0b010
#define BANNED 0b100

struct User {
  std::string firstname;
  std::string lastname;
  ulong jhid;
  int machine_perms;

  // queue of pending messages awaiting delivery
  MessageQueue mqueue;

  User(const ulong &id) : jhid(id) { }
};

#endif // USER_H
