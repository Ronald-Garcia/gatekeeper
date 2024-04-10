#include <iostream>
#include <csignal>
#include "server.h"

// If you implement the Server class as described by its
// TODO comments, you should not need to make any changes
// to this main function.

int main(int argc, char **argv) {
  if (argc != 3) {
    std::cerr << "Usage: server_main <port> <database_file_name>\n";
    return 1;
  }

  int port = std::stoi(argv[1]);
  std::string filename = argv[2];

  // ignore SIGPIPE: when the server sends data to the receive client,
  // it may find that the connection has been terminated (e.g., if the
  // receive client exited)
  signal(SIGPIPE, SIG_IGN);

  Server server(port, filename);
  if (!server.listen()) {
    std::cerr << "Could not listen on port " << port << "\n";
    return 1;
  }

  server.handle_client_requests();
}
