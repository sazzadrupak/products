import Boom from '@hapi/boom';
import * as chai from 'chai'; // Use this for Chai
import { expect } from 'chai';
import { Request, Response } from 'express';
import sinon, { SinonStub } from 'sinon';
import sinonChai from 'sinon-chai';
import errorHandler from '../../src/middleware/errorHandler.js';

chai.use(sinonChai);

describe('errorHandler Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: SinonStub;

  beforeEach(() => {
    req = {};
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    next = sinon.stub();
  });

  it('should return a Boom error with the correct status and message', () => {
    const boomError = Boom.badRequest('Bad request example');

    errorHandler(boomError, req as Request, res as Response, next);

    expect(res.status).to.have.been.calledOnceWith(400); // Boom.badRequest maps to 400
    expect(res.json).to.have.been.calledWith({ error: 'Bad request example' });
  });

  it('should handle non-Boom errors and return a 500 status with a generic message', () => {
    const genericError = new Error('Something went wrong');

    errorHandler(genericError, req as Request, res as Response, next);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({
      error: 'Internal server error',
    });
  });

  it('should handle unknown errors gracefully', () => {
    const unknownError = 'Unexpected error';

    errorHandler(unknownError, req as Request, res as Response, next);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({
      error: 'Internal server error',
    });
  });

  // This test was added for the `console.error` in the errorHandler.ts file
  // it('should log the error for non-Boom errors', () => {
  //   const consoleSpy = sinon.spy(console, 'error');
  //   const genericError = new Error('Some unexpected error');

  //   errorHandler(genericError, req as Request, res as Response, next);

  //   expect(consoleSpy).to.have.been.calledWith(
  //     'Unhandled error:',
  //     genericError
  //   );
  //   consoleSpy.restore();
  // });
});
