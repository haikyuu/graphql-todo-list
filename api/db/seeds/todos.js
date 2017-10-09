exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("Todos")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("Todos").insert([
        { id: "1", text: "Ace the interview", priority: "HIGH" },
        {
          id: "2",
          text: "Finish the salad",
          priority: "HIGH",
          dueDate: "12/12/2018"
        },
        { id: "3", text: "Start running docker" }
      ]);
    });
};
