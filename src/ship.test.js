const Ship = require('./ship');

test('Given a 3, should initiate an object with length: 3 & totalHits: 0', () => {
    let submarine = Ship({ length: 3 });
    expect(submarine.length).toBe(3);
    expect(submarine.totalHits).toBe(0);
}); 

// Incoming query message that returns a value with no side effects
test('isSunk() should return true when Ship is completely hit', () => {
    const destroyer = Ship({length: 2});
    destroyer.totalHits = 2;
    expect(destroyer.isSunk()).toBeTruthy();
});

// Incoming command message
// assert side effects
test('hit(2) should mark position 2 as hit', () => {
    const carrier = Ship({length: 3});
    carrier.hit(2);
    expect(carrier.bodyHits[2]).toBeTruthy();
    expect(carrier.totalHits).toBe(1);
});
