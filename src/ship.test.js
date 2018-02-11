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
    expect(carrier.totalHits).toBe(1);
});


test('setPosition() takes a 2d array and should set coordinates to given [[2,3],[2,4]]', () => {
    const destroyer = Ship({ length: 2});
    const coordinates = [[2,3], [2,4]];
    destroyer.setPosition(coordinates);
    expect(destroyer.coordinates).toEqual([[2,3], [2,4]]);
});

test('isHit() returns true when ship is hit', () => {
    const destroyer = Ship({ length: 2});
    const coordinates = [[2,3], [2,4]];
    destroyer.setPosition(coordinates);
    expect(destroyer.isHit([2,3])).toBeTruthy();
});

test('isHit() returns false when ship is not hit', () => {
    const destroyer = Ship({ length: 2});
    destroyer.setPosition([[2,3], [2,4]]);
    expect(destroyer.isHit([2,5])).toBeFalsy();
});
