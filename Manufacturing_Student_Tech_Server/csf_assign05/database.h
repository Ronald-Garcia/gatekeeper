#ifndef DATABASE_H
#define DATABASE_H

#include <string>
#include <set>
#include <pthread.h>
#include <iostream>
#include <fstream>
#include <map>

struct User;

// A Room object is a representation of a chat room.
// At a minimum, it should keep track of the User objects representing
// receivers who have joined the room.
class Database {
public:
  Database(const std::string &filename);
  ~Database();
  

  std::string get_file_name() const { return filename; }

  User* check_student(ulong student);
  User* check_admin(ulong admin);
  bool add_student(User *student_to_add, User* admin);
  bool add_admin(User *student_to_add, User* admin);
private:
  std::string filename;
  std::ofstream file;
  std::map<ulong, User*> students;
  std::map<ulong, User*> admins;
  pthread_mutex_t lock;
  Database(const Database&);
  Database& operator=(const Database&);
};

#endif // ROOM_H
