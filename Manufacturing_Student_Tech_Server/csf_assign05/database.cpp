#include "guard.h"
#include "message.h"
#include "message_queue.h"
#include "user.h"
#include "database.h"

Database::Database(const std::string &filename)
  : filename(filename), file(filename) {
  // Completed: initialize the mutex
  pthread_mutex_init(&lock, NULL);

  admins.insert(std::pair<ulong, User*>(6010675004172191, new User(6010675004172191)));
}

Database::~Database() {
  // Completed: destroy the mutex
  file.close();
  pthread_mutex_destroy(&lock);
}

User* Database::check_student(ulong user) {
  // Completed: add User to the room
  {
    Guard g(lock);
    if (students.count(user) == 0) return nullptr;

    return students[user];

  }
}

User* Database::check_admin(ulong user) {
  // Completed: add User to the room
  {
    Guard g(lock);

    if (admins.count(user) == 0) return nullptr;

    return admins[user];
  }
}

bool Database::add_student(User *student_to_add, User* admin) {
  // Completed: remove User from the room
  {
    Guard g(lock);
    if (!admins.count(admin->jhid)) {
      return false;
    }

    students.insert( std::pair<ulong, User*>(student_to_add->jhid, student_to_add));
  }

  return true;
}

bool Database::add_admin(User *admin_to_add, User* admin) {
  // Completed: remove User from the room
  {
    Guard g(lock);
    if (!admins.count(admin->jhid)) {
      return false;
    }

    admins.insert( std::pair<ulong, User*>(admin_to_add->jhid, admin_to_add));

  }
  return true;

}



/*void Database::broadcast_message(const std::string &sender_username, const std::string &message_text) {

  // Completed: send a message to every (receiver) User in the room

  Message* m = new Message(TAG_DELIVERY, room_name + std::string(":") + sender_username + std::string(":") + message_text);
    
  for (UserSet::iterator i = members.begin(); i != members.end(); i++ ) {
    (*i)->mqueue.enqueue(m);
  } 
}*/
