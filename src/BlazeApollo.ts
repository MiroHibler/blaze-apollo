import { rxify } from 'apollo-client-rxjs';
import ApolloClient, { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs/Observable';
import { ApolloQueryObservable } from './ApolloQueryObservable';

import 'rxjs/add/observable/from';

export class BlazeApollo {
  constructor (
    private client: ApolloClient,
    private clientConfig: any
  ) {
    this.client = client || new ApolloClient(clientConfig);
  }

  public defaultClient(client: ApolloClient) {
    this.client = client;
  };

  public query(options: any) {
    this.check();

    return this.client.query(options);
  };

  public watchQuery(options: any): ApolloQueryObservable<ApolloQueryResult> {
    this.check();

    return new ApolloQueryObservable(rxify(this.client.watchQuery)(options));
  };

  public mutate(options: any) {
    this.check();

    return this.client.mutate(options);
  };

  public subscribe(options: any): Observable<any> {
    this.check();

    if (typeof this.client.subscribe === 'undefined') {
      throw new Error(`Your version of ApolloClient doesn't support subscriptions`);
    }

    return Observable.from(this.client.subscribe(options));
  };

  private check(): void {
    if (!this.client) {
      throw new Error('Client is missing. Use BlazeApollo.defaultClient');
    }
  };
}
