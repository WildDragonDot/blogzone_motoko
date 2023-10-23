import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import Time "mo:base/Time";
import Int64 "mo:base/Int64";

actor {
  type Article = {
    id : Nat;
    title : Text;
    post : Text;
    time : Int;
  };

  var posts : [Article] = [];
  var nextId : Nat = 0;

  public func add(title : Text, article : Text) : async Article {
    let currentDate : Int = Time.now();
    let post : Article = {
      id = nextId;
      post = article;
      time = currentDate;
      title = title;
    };
    nextId += 1;
    posts := Array.append<Article>(posts, [post]); // Use Array.append to add to the array
    return post;
  };

  public func getPosts() : async [Article] {
    return posts;
  };

  public func singlePost(id : Nat) : async [Article] {
    let matchingPosts : [Article] = Array.tabulate<Article>(
      posts.size(),
      func(index : Nat) : Article {
        let post = posts[index];
        if (post.id == id) {
          return {
            id = post.id;
            post = post.post;
            time = post.time;
            title = post.title;
          };
        } else {
          return post;
        };
      },
    );

    return matchingPosts;
  };

  public func editPost(id : Nat, article : Text, title : Text) : async () {
    let currentDate : Int = Time.now();
    posts := Array.tabulate<Article>(
      posts.size(),
      func(index : Nat) : Article {
        let post = posts[index];
        if (post.id == id) {
          return {
            id = post.id;
            post = article;
            time = currentDate;
            title = title;
          };
        } else {
          return post;
        };
      },
    );
  };

  public func removePost(idToRemove : Nat) : async () {
    posts := Array.filter(
      posts,
      func(post : Article) : Bool {
        return post.id != idToRemove;
      },
    );
  };
};
