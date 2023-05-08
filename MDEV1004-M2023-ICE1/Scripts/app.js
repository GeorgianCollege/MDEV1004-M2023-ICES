// IIFE -- Immediately Invoked Function Expression
// AKA - Self Executing Function
(function () {
    function StartAll() {
        Start1();
        Start2();
        Start3();
    }
    /* function type 1 = named functions */
    /**
     * This function demonstrates type 1 functions in JavaScript
     *
     */
    function Start1() {
        console.log("App Started - type 1");
    }
    /* function type 2 = anonymous functions pointed to by a variable or const */
    var Start2 = function () {
        console.log("App Started - type 2");
    };
    /* function type 3 = arrow function */
    var Start3 = function () {
        console.log("App Started - type 3");
    };
    window.addEventListener("load", Start1);
})();
//# sourceMappingURL=app.js.map