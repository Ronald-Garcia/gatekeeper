#include <iostream>
#include <string>
#include <vector>
#include <stdexcept>
#include "csapp.h"
#include "message.h"
#include "connection.h"
#include "client_util.h"
#include "user.h"

int main(int argc, char **argv) {
  if (argc != 4) {
    std::cerr << "Usage: ./kiosk [server_address] [port] [filename]\n";
    return 1;
  }

  std::string server_hostname = argv[1];
  int server_port = std::stoi(argv[2]);
  std::string filename = argv[3];

  Connection conn;

  // Completed: connect to server
  conn.client_connect(server_hostname, server_port);

  // Completed: send rlogin and join messages (expect a response from
  //       the server for each one)

  // Completed: send rlogin and join messages (expect a response from
  //       the server for each one)
  
  // stores each line of text sent by sender
  std::string local_buf;

  ulong cur_admin;

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

    message_to_send.tag = TAG_ALOGIN;
    message_to_send.data = jhid;
    
    if (!conn.send(message_to_send)) {
      std::cout << "ERROR: could not send message to server"; 
      exit(1);
    }

    cur_admin = std::stoul(jhid);
  }

  std::cout << "Welcome!" << std::endl;
  bool quit = false;
  
  while (!quit) {
    std::cout << "[1] Add User" << std::endl;
    std::cout << "[2] Modify User" << std::endl;
    std::cout << "[3] Quit" << std::endl;
    std::cout << "[4] " << std::endl;
    std::cout << "[5] " << std::endl;
    

    
  }

  return 0;
}
