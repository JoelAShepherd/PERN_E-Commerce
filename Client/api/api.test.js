import {api} from './api';

test("get date contains year, month and date", () => {
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth());
    const day = String(date.getDate());

    expect(api.getDate()).toContain(year);
    expect(api.getDate()).toContain(month);
    expect(api.getDate()).toContain(day);

})