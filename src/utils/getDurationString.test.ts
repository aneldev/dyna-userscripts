import {getDurationString} from "./getDurationString";

// eslint-disable-next-line
const moment = require("moment").default || require("moment");

describe('getDurationString', () => {
  it('returns the correct duration for timestamps within the last minute', () => {
    const start = moment().subtract(30, 'seconds');
    expect(getDurationString(start, Date.now(), 1)).toEqual('30 secs');
  });

  it('returns the correct duration for timestamps within the last hour', () => {
    const start = moment().subtract(30, 'minutes');
    expect(getDurationString(start, Date.now())).toEqual('30 mins');
  });

  it('returns the correct duration for timestamps within the last day', () => {
    const start = moment().subtract(12, 'hours');
    expect(getDurationString(start, Date.now())).toEqual('12 hours');
  });

  it('returns the correct duration for timestamps within the last week', () => {
    const start = moment().subtract(3, 'days');
    expect(getDurationString(start, Date.now())).toEqual('3 days');
  });

  it('returns the correct duration for timestamps within the last month', () => {
    const start = moment().subtract(2, 'weeks');
    expect(getDurationString(start, Date.now())).toEqual('2 weeks');
  });

  it('returns the correct duration for timestamps within the last year', () => {
    const start = moment().subtract(8, 'months');
    expect(getDurationString(start, Date.now(), 0)).toEqual('8 months');
  });

  it('returns the correct duration for timestamps older than one year', () => {
    const start = moment().subtract(2, 'years');
    expect(getDurationString(start, Date.now(), 0)).toEqual('2 years');
  });

  it('returns the correct duration with one decimal point for fractional values', () => {
    const start = moment().subtract(75, 'minutes');
    expect(getDurationString(start, Date.now())).toEqual('1.3 hours');
  });

  it('does not include decimal point if the fractional part is zero', () => {
    const start = moment().subtract(3, 'weeks');
    expect(getDurationString(start, Date.now())).toEqual('3 weeks');
  });

  it('rounds the fractional week value to one decimal place', () => {
    const start = moment().subtract(10, 'days')
      .subtract(12, 'hours')
      .subtract(30, 'minutes');
    expect(getDurationString(start, Date.now())).toEqual('1.5 weeks');
  });

  it('rounds the fractional month value to one decimal place', () => {
    const start = moment().subtract(1, 'days')
      .subtract(12, 'hours')
      .subtract(30, 'minutes');
    expect(getDurationString(start, Date.now())).toEqual('1.5 days');
  });
  it('positive duration', ()=>{
    expect(getDurationString(1709725574573, 1709725744176, 0))
      .toBe('3 mins');
  });
  it('negative duration', ()=>{
    expect(getDurationString(1709725744176, 1709725574573, 0))
      .toBe('-3 mins');
  });
});
