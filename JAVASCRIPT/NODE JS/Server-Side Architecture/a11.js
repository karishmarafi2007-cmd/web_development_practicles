try {

    let result = 10 / 0;

    console.log(result);

    throw new Error("Something went wrong");

}
catch (error) {

    console.log("Error:", error.message);

}
finally {

    console.log("Program completed.");

}