import test from 'ava';
import sinon from 'sinon'

import Hello from './../../app/scripts/hello';

const hello = new Hello();

test.beforeEach(t => {
	t.context.log = console.log;
	console.log = sinon.spy();
});

test.afterEach(t => {
    console.log = t.context.log;
});

test('hello - is defined', t => {
	t.not(hello, undefined, 'hello is defined');
});

test('hello - sayHi is called', t => {
	const funcSpy = sinon.spy(hello, 'sayHi');
	const callParam = 'hello - sayHi';

	hello.sayHi(callParam);

	t.true(funcSpy.calledOnce);
	t.true(funcSpy.calledWith(callParam));
});

test('hello - domUpdate is called', t => {
	const funcSpy = sinon.spy(hello, 'domUpdate');

	hello.domUpdate();
	t.true(funcSpy.calledOnce);
});
