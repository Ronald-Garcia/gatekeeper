#ifndef SERVER_H
#define SERVER_H

#include <map>
#include <string>
#include <pthread.h>
#include "connection.h"

class Database;

class Server {
public:
  Server(int port, std::string filename);
  ~Server();

  bool listen();

  void handle_client_requests();

  typedef struct {
    Connection* connection;
    Server* server;
    Database* data;
  } ConnInfo;


private:
  // prohibit value semantics
  Server(const Server &);
  Server &operator=(const Server &);

  // These member variables are sufficient for implementing
  // the server operations
  int m_port;
  int m_ssock;
  pthread_mutex_t m_lock;
  Database* m_database;

};

#endif // SERVER_H
