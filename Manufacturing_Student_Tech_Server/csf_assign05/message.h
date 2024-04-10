#ifndef MESSAGE_H
#define MESSAGE_H

#include <vector>
#include <string>

// standard message tags (note that you don't need to worry about
// "senduser" or "empty" messages)
#define TAG_ERR       "err"       // protocol error
#define TAG_OK        "ok"        // success response
#define TAG_SLOGIN    "slogin"    // log in student
#define TAG_ALOGIN    "alogin"    // log in admin
#define TAG_CHECK     "check"     // user sent for approval (student or admin)
#define TAG_ADD       "add"       // user sent for approval (student or admin)
#define TAG_DELIVERY  "delivery"  // message delivered by server to receiving client, approve/disapprove
#define TAG_QUIT      "quit"      // quit
#define TAG_EMPTY     "empty"     // sent by server to receiving client to indicate no msgs available

/*
 * A message must be a single line of text with no newline characters contained within it.
 * A message ends at a newline terminator which can be either "\n" or "\r\n". Your programs must be able to accept both of these as newline delimiters.
 * The tag must be one of the operations specified in the “tag table”.
 * The payload is an arbitrary sequence of characters. If a tag has a structured payload, the payload must be formatted exactly as specified.
 * If a tag has a payload that is ignored (e.g., the “quit” and “leave” tags), the tag/payload separator character : must still be present (e.g. quit: not quit), even if the payload is empty
 * An encoded message must not be more than MAX_LEN bytes.
 */

struct Message {
  // An encoded message may have at most this many characters,
  // including the trailing newline ('\n'). Note that this does
  // *not* include a NUL terminator (if one is needed to
  // temporarily store the encoded message.)
  static const unsigned MAX_LEN = 255;

  std::string tag; // COMMANDS (must always have :)
  std::string data; // PARAMETERS FOR COMMANDS

  Message() { }

  Message(const std::string &tag, const std::string &data)
    : tag(tag), data(data) { }

  std::string to_string() const {
    std::string ret_string;

    ret_string.append(tag);
    ret_string.append(":");
    ret_string.append(data);
    ret_string.append("\n");

    return ret_string;
  }

  bool is_valid_tag() const {
    return tag == TAG_ERR ||
           tag == TAG_SLOGIN || 
           tag == TAG_ALOGIN || 
           tag == TAG_OK || 
           tag == TAG_CHECK ||
           tag == TAG_ADD ||
           tag == TAG_QUIT ||
           tag == TAG_DELIVERY ||
           tag == TAG_EMPTY;
  }
};


#endif // MESSAGE_H
