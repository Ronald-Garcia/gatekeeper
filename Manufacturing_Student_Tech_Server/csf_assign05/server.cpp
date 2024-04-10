#include <pthread.h>
#include <iostream>
#include <sstream>
#include <memory>
#include <set>
#include <vector>
#include <cctype>
#include <cassert>
#include "message.h"
#include "user.h"
#include "database.h"
#include "guard.h"
#include "client_util.h"
#include "server.h"

////////////////////////////////////////////////////////////////////////
// Server implementation data types
////////////////////////////////////////////////////////////////////////

// TODO: add any additional data types that might be helpful
//       for implementing the Server member functions

////////////////////////////////////////////////////////////////////////
// Client thread functions
////////////////////////////////////////////////////////////////////////

namespace {

  void chat_with_admin(Server::ConnInfo* connInfo, User& user);
  void chat_with_student(Server::ConnInfo* connInfo, User& user);


  void *worker(void *arg) {
    pthread_detach(pthread_self());

    // Completed: use a static cast to convert arg from a void* to
    //       whatever pointer type describes the object(s) needed
    //       to communicate with a client (sender or receiver)
    Server::ConnInfo* connInfo = (Server::ConnInfo*) arg;

    Connection* connection = connInfo->connection;

    Database* data = connInfo->data;
    // Completed: read login message (should be tagged either with
    //       TAG_SLOGIN or TAG_RLOGIN), send response
    
    Message msg;
    if (!connection->receive(msg)) {
      fatal("Did not receive message");
    }
    Message response_message;
    if ((msg.tag == std::string(TAG_SLOGIN) && data->check_student(std::stoul(msg.data)) != nullptr) 
        || (msg.tag == std::string(TAG_ALOGIN) && data->check_admin(std::stoul(msg.data)) != nullptr)) {
      
      response_message.tag = TAG_OK;
      response_message.data = "logged in";

    } else {
      
      response_message.tag = TAG_ERR;
      response_message.data = "Sorry, you can't do that!";

    }
    if (!connection->server_send(response_message)) {
      fatal("Against all odds, an invalid message was sent.");
    }

    // Completed: depending on whether the client logged in as a sender or
    //       receiver, communicate with the client (implementing
    //       separate helper functions for each of these possibilities
    //       is a good idea)

    User user(std::stoul(msg.data));
    
    if (msg.tag == TAG_ALOGIN) {
      chat_with_admin(connInfo, user);
    }
    else if (msg.tag == TAG_SLOGIN) {
      chat_with_student(connInfo, user);
    }

    delete connInfo;



    return nullptr;
  }

  void chat_with_admin(Server::ConnInfo* connInfo, User& user) {

    Connection* connection = connInfo->connection;
    Server* server = connInfo->server;
    Database* cur_database = connInfo->data;

    bool quit = false;

    Message err_message(TAG_ERR, "Sorry, you can't do that");
    Message ok_message(TAG_OK, "confirmed.");

    Message received_message;

    while (!quit) {
      received_message.tag = "";
      received_message.data = "";

      if (!connection->receive(received_message)) {
        // no need to check for valid send, as we create the message
        err_message.data = "invalid message";
        connection->server_send(err_message);
        return;
      } else if (received_message.tag == std::string(TAG_CHECK)) { //Check logic.
        
        ulong jhid = std::stoul(received_message.data);

        User* student = cur_database->check_student(jhid);
        User* admin = cur_database->check_admin(jhid);
        if (student != nullptr) {
          ok_message.data = "Found student. ;" + student->machine_perms;
        } else if (admin != nullptr) {
          ok_message.data = "Found admin. ;" + admin->machine_perms;
        } else {
          ok_message.data = "No user found with id.";
        }

        connection->server_send(ok_message);
      } else if (received_message.tag == std::string(TAG_ADD)){ //Adding logic.

        // get message data from message
        std::string payload = received_message.data;

        // get the first instance of colon
        int first_colon_index = payload.find(":");
        // get index in substring then add by offset
        int second_colon_index = first_colon_index + 1 + payload.substr(first_colon_index + 1).find(":");

        // divide up each string
        std::string user_type = payload.substr(0, first_colon_index);
        int machine_perms = std::stoi(payload.substr(first_colon_index + 1, second_colon_index - first_colon_index - 1));
        ulong jhid = std::stoul(payload.substr(second_colon_index + 1));

        User* cur_user;

        if (user_type == std::string("student")) {
          cur_user = cur_database->check_student(jhid);
        } else {
          cur_user = cur_database->check_admin(jhid);
        }

        if (cur_user == nullptr) {
          User* cur_user = new User(jhid);
          if (user_type == std::string("student")) {
            cur_database->add_student(cur_user, &user);
          } else {
            cur_database->add_admin(cur_user, &user);
          }
          ok_message.data = "Added a new user.";
        } 
        cur_user->machine_perms = machine_perms;
        ok_message.data = "Modified a user.";
        
        connection->server_send(ok_message);
      } else if (received_message.tag == std::string(TAG_QUIT)) {
        ok_message.data = "ok quit";

        connection->server_send(ok_message);
        quit = true;
      } else {
        //We recieved a "valid" messege, but not for sender at this point.
        err_message.data = "invalid message";
        connection->server_send(err_message);
        return;
      }

    }
  }
  void chat_with_student(Server::ConnInfo* connInfo, User& user) {

    Connection* connection = connInfo->connection;
    Server* server = connInfo->server;
    Database* cur_database = connInfo->data;

    bool quit = false;

    Message err_message(TAG_ERR, "Sorry, you can't do that");
    Message ok_message(TAG_OK, "confirmed.");

    Message received_message;

    while (!quit) {
      received_message.tag = "";
      received_message.data = "";

      if (!connection->receive(received_message)) {
        // no need to check for valid send, as we create the message
        err_message.data = "invalid message";
        connection->server_send(err_message);
        return;
      } else if (received_message.tag == std::string(TAG_CHECK)) { //Check logic.
        
        ulong jhid = std::stoul(received_message.data);

        User* student = cur_database->check_student(jhid);
        User* admin = cur_database->check_admin(jhid);
        if (student != nullptr) {
          ok_message.data = "Found student. ;" + student->machine_perms;
        } else if (admin != nullptr) {
          ok_message.data = "Found admin. ;" + admin->machine_perms;
        } else {
          ok_message.data = "No user found with id.";
        }

        connection->server_send(ok_message);
      } else if (received_message.tag == std::string(TAG_ADD)){ //Adding logic.

        // get message data from message
        std::string payload = received_message.data;

        // get the first instance of colon
        int first_colon_index = payload.find(":");
        // get index in substring then add by offset
        int second_colon_index = first_colon_index + 1 + payload.substr(first_colon_index + 1).find(":");

        // divide up each string
        std::string user_type = payload.substr(0, first_colon_index);
        int machine_perms = std::stoi(payload.substr(first_colon_index + 1, second_colon_index - first_colon_index - 1));
        ulong jhid = std::stoul(payload.substr(second_colon_index + 1));

        User* cur_user;

        if (user_type == std::string("student")) {
          cur_user = cur_database->check_student(jhid);
        } else {
          cur_user = cur_database->check_admin(jhid);
        }

        if (cur_user == nullptr) {
          User* cur_user = new User(jhid);
          ok_message.data = "Added a new user.";
        } 
        cur_user->machine_perms = machine_perms;
        ok_message.data = "Modified a user.";
        
        connection->server_send(ok_message);
      } else if (received_message.tag == std::string(TAG_QUIT)) {
        ok_message.data = "ok quit";

        connection->server_send(ok_message);
        quit = true;
      } else {
        //We recieved a "valid" messege, but not for sender at this point.
        err_message.data = "invalid message";
        connection->server_send(err_message);
        return;
      }

    }
  }
}



////////////////////////////////////////////////////////////////////////
// Server member function implementation
////////////////////////////////////////////////////////////////////////

Server::Server(int port, std::string filename)
  : m_port(port)
  , m_database(new Database(filename))
  , m_ssock(-1) {
  // Completed: initialize mutex

  pthread_mutex_init(&m_lock, NULL);
}

Server::~Server() {
  // Completed: destroy mutex
  pthread_mutex_destroy(&m_lock);
}

bool Server::listen() {
  // Completed: use open_listenfd to create the server socket, return true
  //       if successful, false if not
  
  m_ssock = create_server_socket(m_port);

  
  return m_ssock >= 0;
}

void Server::handle_client_requests() {
  // Completed: infinite loop calling accept or Accept, starting a new
  //       pthread for each connected client

  while (1) {

    int clientfd = Accept(m_ssock, NULL, NULL);

    if (clientfd < 0) { 
      fatal("Error accepting client connection.");
    }

    pthread_t thr_id;
    ConnInfo* connInfo = new ConnInfo;
    connInfo->connection = new Connection(clientfd);
    connInfo->server = this;
    connInfo->data = m_database;

    if (pthread_create(&thr_id, NULL, worker, connInfo) != 0) {
      fatal("pthread_create failed.");
    }
  }

}