#include <iostream>
#include <string>
#include <sstream>
#include <stdexcept>
#include "csapp.h"
#include "message.h"
#include "connection.h"
#include "client_util.h"

int main(int argc, char **argv) {
  if (argc != 4) {
    std::cerr << "Usage: ./client_machine [server_address] [port] [username]\n";
    return 1;
  }

  std::string server_hostname;
  int server_port;
  int machine_bit = 0;

  server_hostname = argv[1];
  server_port = std::stoi(argv[2]);
  machine_bit = std::stoi(argv[3]);

  Connection conn;

  // Completed: connect to server
  conn.client_connect(server_hostname, server_port);

  // Completed: send rlogin and join messages (expect a response from
  //       the server for each one)
  
  // stores each line of text sent by sender
  std::string local_buf;

  while (!std::cin.eof()) {
    Message message_to_send;

    getline(std::cin, local_buf);

    if (std::cin.eof()) {
      message_to_send.tag = TAG_QUIT;
      conn.send(message_to_send);
      exit(0);
    }

    std::string jhid = trim(local_buf);
    try {
      std::stoul(jhid);
      
    } catch (std::exception e) {
      std::cout << "ERROR: not valid jhcard.";
      continue;
    }

    message_to_send.tag = TAG_SLOGIN;
    message_to_send.data = jhid;
    
    if (!conn.send(message_to_send)) {
      std::cout << "ERROR: could not send message to server"; 
      exit(1);
    }
    Message response_message;
    message_to_send.tag = TAG_CHECK;
    message_to_send.data = jhid;
    if (!conn.server_send(message_to_send)) {
      std::cout << "ERROR: could not send message to server"; 
      exit(1);
    }

    if (!conn.receive(response_message)) {
      std::cout << "ERROR: jsdnfi";
      exit(1);
    }
    std::cout << response_message.to_string();
  }
  // Completed: loop reading commands from user, sending messages to
  //       server as appropriate

  return 0;
}
