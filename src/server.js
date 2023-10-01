const { connectDatabase } = require("./config/database");
const app = require("./index");

connectDatabase();

app.listen("4949", () => {
    console.log(`Server running on port`);
});
