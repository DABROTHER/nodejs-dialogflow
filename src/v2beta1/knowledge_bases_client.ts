// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as gax from 'google-gax';
import {
  APICallback,
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
  PaginationCallback,
  PaginationResponse,
} from 'google-gax';
import * as path from 'path';

import {Transform} from 'stream';
import * as protosTypes from '../../protos/protos';
import * as gapicConfig from './knowledge_bases_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Manages knowledge bases.
 *
 *  Allows users to setup and maintain knowledge bases with their knowledge data.
 * @class
 * @memberof v2beta1
 */
export class KnowledgeBasesClient {
  private _descriptors: Descriptors = {
    page: {},
    stream: {},
    longrunning: {},
    batching: {},
  };
  private _innerApiCalls: {[name: string]: Function};
  private _pathTemplates: {[name: string]: gax.PathTemplate};
  private _terminated = false;
  private _opts: ClientOptions;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  knowledgeBasesStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of KnowledgeBasesClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this.constructor as typeof KnowledgeBasesClient;
    const servicePath =
      opts && opts.servicePath
        ? opts.servicePath
        : opts && opts.apiEndpoint
        ? opts.apiEndpoint
        : staticMembers.servicePath;
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;
    opts.clientConfig = opts.clientConfig || {};

    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      opts.fallback = true;
    }
    // If we are in browser, we are already using fallback because of the
    // "browser" field in package.json.
    // But if we were explicitly requested to use fallback, let's do it now.
    this._gaxModule = !isBrowser && opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this.constructor as typeof KnowledgeBasesClient).scopes;
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Determine the client header string.
    const clientHeader = [`gax/${this._gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'protos.json'
    );
    this._protos = this._gaxGrpc.loadProto(
      opts.fallback ? require('../../protos/protos.json') : nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this._pathTemplates = {
      projectAgentPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/agent'
      ),
      projectAgentIntentPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/agent/intents/{intent}'
      ),
      projectLocationAgentPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/agent'
      ),
      projectLocationAgentIntentPathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/agent/intents/{intent}'
      ),
    };

    // Some of the methods on this service return "paged" results,
    // (e.g. 50 results at a time, with tokens to get subsequent
    // pages). Denote the keys used for pagination and results.
    this._descriptors.page = {
      listKnowledgeBases: new this._gaxModule.PageDescriptor(
        'pageToken',
        'nextPageToken',
        'knowledgeBases'
      ),
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.cloud.dialogflow.v2beta1.KnowledgeBases',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.knowledgeBasesStub) {
      return this.knowledgeBasesStub;
    }

    // Put together the "service stub" for
    // google.cloud.dialogflow.v2beta1.KnowledgeBases.
    this.knowledgeBasesStub = this._gaxGrpc.createStub(
      this._opts.fallback
        ? (this._protos as protobuf.Root).lookupService(
            'google.cloud.dialogflow.v2beta1.KnowledgeBases'
          )
        : // tslint:disable-next-line no-any
          (this._protos as any).google.cloud.dialogflow.v2beta1.KnowledgeBases,
      this._opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const knowledgeBasesStubMethods = [
      'listKnowledgeBases',
      'getKnowledgeBase',
      'createKnowledgeBase',
      'deleteKnowledgeBase',
      'updateKnowledgeBase',
    ];

    for (const methodName of knowledgeBasesStubMethods) {
      const innerCallPromise = this.knowledgeBasesStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const apiCall = this._gaxModule.createApiCall(
        innerCallPromise,
        this._defaults[methodName],
        this._descriptors.page[methodName] ||
          this._descriptors.stream[methodName] ||
          this._descriptors.longrunning[methodName]
      );

      this._innerApiCalls[methodName] = (
        argument: {},
        callOptions?: CallOptions,
        callback?: APICallback
      ) => {
        return apiCall(argument, callOptions, callback);
      };
    }

    return this.knowledgeBasesStub;
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'dialogflow.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'dialogflow.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/dialogflow',
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  getKnowledgeBase(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IGetKnowledgeBaseRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase,
      (
        | protosTypes.google.cloud.dialogflow.v2beta1.IGetKnowledgeBaseRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  getKnowledgeBase(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IGetKnowledgeBaseRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase,
      | protosTypes.google.cloud.dialogflow.v2beta1.IGetKnowledgeBaseRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Retrieves the specified knowledge base.
   *
   * Note: The `projects.agent.knowledgeBases` resource is deprecated;
   * only use `projects.knowledgeBases`.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. The name of the knowledge base to retrieve.
   *   Format `projects/<Project ID>/knowledgeBases/<Knowledge Base ID>`.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [KnowledgeBase]{@link google.cloud.dialogflow.v2beta1.KnowledgeBase}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  getKnowledgeBase(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IGetKnowledgeBaseRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase,
          | protosTypes.google.cloud.dialogflow.v2beta1.IGetKnowledgeBaseRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase,
      | protosTypes.google.cloud.dialogflow.v2beta1.IGetKnowledgeBaseRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase,
      (
        | protosTypes.google.cloud.dialogflow.v2beta1.IGetKnowledgeBaseRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
    });
    this.initialize();
    return this._innerApiCalls.getKnowledgeBase(request, options, callback);
  }
  createKnowledgeBase(
    request: protosTypes.google.cloud.dialogflow.v2beta1.ICreateKnowledgeBaseRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase,
      (
        | protosTypes.google.cloud.dialogflow.v2beta1.ICreateKnowledgeBaseRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  createKnowledgeBase(
    request: protosTypes.google.cloud.dialogflow.v2beta1.ICreateKnowledgeBaseRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase,
      | protosTypes.google.cloud.dialogflow.v2beta1.ICreateKnowledgeBaseRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Creates a knowledge base.
   *
   * Note: The `projects.agent.knowledgeBases` resource is deprecated;
   * only use `projects.knowledgeBases`.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The project to create a knowledge base for.
   *   Format: `projects/<Project ID>`.
   * @param {google.cloud.dialogflow.v2beta1.KnowledgeBase} request.knowledgeBase
   *   Required. The knowledge base to create.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [KnowledgeBase]{@link google.cloud.dialogflow.v2beta1.KnowledgeBase}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  createKnowledgeBase(
    request: protosTypes.google.cloud.dialogflow.v2beta1.ICreateKnowledgeBaseRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase,
          | protosTypes.google.cloud.dialogflow.v2beta1.ICreateKnowledgeBaseRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase,
      | protosTypes.google.cloud.dialogflow.v2beta1.ICreateKnowledgeBaseRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase,
      (
        | protosTypes.google.cloud.dialogflow.v2beta1.ICreateKnowledgeBaseRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    this.initialize();
    return this._innerApiCalls.createKnowledgeBase(request, options, callback);
  }
  deleteKnowledgeBase(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IDeleteKnowledgeBaseRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.protobuf.IEmpty,
      (
        | protosTypes.google.cloud.dialogflow.v2beta1.IDeleteKnowledgeBaseRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  deleteKnowledgeBase(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IDeleteKnowledgeBaseRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.protobuf.IEmpty,
      | protosTypes.google.cloud.dialogflow.v2beta1.IDeleteKnowledgeBaseRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Deletes the specified knowledge base.
   *
   * Note: The `projects.agent.knowledgeBases` resource is deprecated;
   * only use `projects.knowledgeBases`.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. The name of the knowledge base to delete.
   *   Format: `projects/<Project ID>/knowledgeBases/<Knowledge Base ID>`.
   * @param {boolean} request.force
   *   Optional. Force deletes the knowledge base. When set to true, any documents
   *   in the knowledge base are also deleted.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Empty]{@link google.protobuf.Empty}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  deleteKnowledgeBase(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IDeleteKnowledgeBaseRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.protobuf.IEmpty,
          | protosTypes.google.cloud.dialogflow.v2beta1.IDeleteKnowledgeBaseRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.protobuf.IEmpty,
      | protosTypes.google.cloud.dialogflow.v2beta1.IDeleteKnowledgeBaseRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.protobuf.IEmpty,
      (
        | protosTypes.google.cloud.dialogflow.v2beta1.IDeleteKnowledgeBaseRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
    });
    this.initialize();
    return this._innerApiCalls.deleteKnowledgeBase(request, options, callback);
  }
  updateKnowledgeBase(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IUpdateKnowledgeBaseRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase,
      (
        | protosTypes.google.cloud.dialogflow.v2beta1.IUpdateKnowledgeBaseRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  updateKnowledgeBase(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IUpdateKnowledgeBaseRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase,
      | protosTypes.google.cloud.dialogflow.v2beta1.IUpdateKnowledgeBaseRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Updates the specified knowledge base.
   *
   * Note: The `projects.agent.knowledgeBases` resource is deprecated;
   * only use `projects.knowledgeBases`.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {google.cloud.dialogflow.v2beta1.KnowledgeBase} request.knowledgeBase
   *   Required. The knowledge base to update.
   * @param {google.protobuf.FieldMask} request.updateMask
   *   Optional. Not specified means `update all`.
   *   Currently, only `display_name` can be updated, an InvalidArgument will be
   *   returned for attempting to update other fields.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [KnowledgeBase]{@link google.cloud.dialogflow.v2beta1.KnowledgeBase}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  updateKnowledgeBase(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IUpdateKnowledgeBaseRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase,
          | protosTypes.google.cloud.dialogflow.v2beta1.IUpdateKnowledgeBaseRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase,
      | protosTypes.google.cloud.dialogflow.v2beta1.IUpdateKnowledgeBaseRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase,
      (
        | protosTypes.google.cloud.dialogflow.v2beta1.IUpdateKnowledgeBaseRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'knowledge_base.name': request.knowledgeBase!.name || '',
    });
    this.initialize();
    return this._innerApiCalls.updateKnowledgeBase(request, options, callback);
  }

  listKnowledgeBases(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IListKnowledgeBasesRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase[],
      protosTypes.google.cloud.dialogflow.v2beta1.IListKnowledgeBasesRequest | null,
      protosTypes.google.cloud.dialogflow.v2beta1.IListKnowledgeBasesResponse
    ]
  >;
  listKnowledgeBases(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IListKnowledgeBasesRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase[],
      protosTypes.google.cloud.dialogflow.v2beta1.IListKnowledgeBasesRequest | null,
      protosTypes.google.cloud.dialogflow.v2beta1.IListKnowledgeBasesResponse
    >
  ): void;
  /**
   * Returns the list of all knowledge bases of the specified agent.
   *
   * Note: The `projects.agent.knowledgeBases` resource is deprecated;
   * only use `projects.knowledgeBases`.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The project to list of knowledge bases for.
   *   Format: `projects/<Project ID>`.
   * @param {number} request.pageSize
   *   Optional. The maximum number of items to return in a single page. By
   *   default 10 and at most 100.
   * @param {string} request.pageToken
   *   Optional. The next_page_token value returned from a previous list request.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is Array of [KnowledgeBase]{@link google.cloud.dialogflow.v2beta1.KnowledgeBase}.
   *   The client library support auto-pagination by default: it will call the API as many
   *   times as needed and will merge results from all the pages into this array.
   *
   *   When autoPaginate: false is specified through options, the array has three elements.
   *   The first element is Array of [KnowledgeBase]{@link google.cloud.dialogflow.v2beta1.KnowledgeBase} that corresponds to
   *   the one page received from the API server.
   *   If the second element is not null it contains the request object of type [ListKnowledgeBasesRequest]{@link google.cloud.dialogflow.v2beta1.ListKnowledgeBasesRequest}
   *   that can be used to obtain the next page of the results.
   *   If it is null, the next page does not exist.
   *   The third element contains the raw response received from the API server. Its type is
   *   [ListKnowledgeBasesResponse]{@link google.cloud.dialogflow.v2beta1.ListKnowledgeBasesResponse}.
   *
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  listKnowledgeBases(
    request: protosTypes.google.cloud.dialogflow.v2beta1.IListKnowledgeBasesRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase[],
          protosTypes.google.cloud.dialogflow.v2beta1.IListKnowledgeBasesRequest | null,
          protosTypes.google.cloud.dialogflow.v2beta1.IListKnowledgeBasesResponse
        >,
    callback?: Callback<
      protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase[],
      protosTypes.google.cloud.dialogflow.v2beta1.IListKnowledgeBasesRequest | null,
      protosTypes.google.cloud.dialogflow.v2beta1.IListKnowledgeBasesResponse
    >
  ): Promise<
    [
      protosTypes.google.cloud.dialogflow.v2beta1.IKnowledgeBase[],
      protosTypes.google.cloud.dialogflow.v2beta1.IListKnowledgeBasesRequest | null,
      protosTypes.google.cloud.dialogflow.v2beta1.IListKnowledgeBasesResponse
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    this.initialize();
    return this._innerApiCalls.listKnowledgeBases(request, options, callback);
  }

  /**
   * Equivalent to {@link listKnowledgeBases}, but returns a NodeJS Stream object.
   *
   * This fetches the paged responses for {@link listKnowledgeBases} continuously
   * and invokes the callback registered for 'data' event for each element in the
   * responses.
   *
   * The returned object has 'end' method when no more elements are required.
   *
   * autoPaginate option will be ignored.
   *
   * @see {@link https://nodejs.org/api/stream.html}
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The project to list of knowledge bases for.
   *   Format: `projects/<Project ID>`.
   * @param {number} request.pageSize
   *   Optional. The maximum number of items to return in a single page. By
   *   default 10 and at most 100.
   * @param {string} request.pageToken
   *   Optional. The next_page_token value returned from a previous list request.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Stream}
   *   An object stream which emits an object representing [KnowledgeBase]{@link google.cloud.dialogflow.v2beta1.KnowledgeBase} on 'data' event.
   */
  listKnowledgeBasesStream(
    request?: protosTypes.google.cloud.dialogflow.v2beta1.IListKnowledgeBasesRequest,
    options?: gax.CallOptions
  ): Transform {
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    const callSettings = new gax.CallSettings(options);
    this.initialize();
    return this._descriptors.page.listKnowledgeBases.createStream(
      this._innerApiCalls.listKnowledgeBases as gax.GaxCall,
      request,
      callSettings
    );
  }
  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified projectAgent resource name string.
   *
   * @param {string} project
   * @returns {string} Resource name string.
   */
  projectAgentPath(project: string) {
    return this._pathTemplates.projectAgentPathTemplate.render({
      project,
    });
  }

  /**
   * Parse the project from ProjectAgent resource.
   *
   * @param {string} projectAgentName
   *   A fully-qualified path representing project_agent resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectAgentName(projectAgentName: string) {
    return this._pathTemplates.projectAgentPathTemplate.match(projectAgentName)
      .project;
  }

  /**
   * Return a fully-qualified projectAgentIntent resource name string.
   *
   * @param {string} project
   * @param {string} intent
   * @returns {string} Resource name string.
   */
  projectAgentIntentPath(project: string, intent: string) {
    return this._pathTemplates.projectAgentIntentPathTemplate.render({
      project,
      intent,
    });
  }

  /**
   * Parse the project from ProjectAgentIntent resource.
   *
   * @param {string} projectAgentIntentName
   *   A fully-qualified path representing project_agent_intent resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectAgentIntentName(projectAgentIntentName: string) {
    return this._pathTemplates.projectAgentIntentPathTemplate.match(
      projectAgentIntentName
    ).project;
  }

  /**
   * Parse the intent from ProjectAgentIntent resource.
   *
   * @param {string} projectAgentIntentName
   *   A fully-qualified path representing project_agent_intent resource.
   * @returns {string} A string representing the intent.
   */
  matchIntentFromProjectAgentIntentName(projectAgentIntentName: string) {
    return this._pathTemplates.projectAgentIntentPathTemplate.match(
      projectAgentIntentName
    ).intent;
  }

  /**
   * Return a fully-qualified projectLocationAgent resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @returns {string} Resource name string.
   */
  projectLocationAgentPath(project: string, location: string) {
    return this._pathTemplates.projectLocationAgentPathTemplate.render({
      project,
      location,
    });
  }

  /**
   * Parse the project from ProjectLocationAgent resource.
   *
   * @param {string} projectLocationAgentName
   *   A fully-qualified path representing project_location_agent resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectLocationAgentName(projectLocationAgentName: string) {
    return this._pathTemplates.projectLocationAgentPathTemplate.match(
      projectLocationAgentName
    ).project;
  }

  /**
   * Parse the location from ProjectLocationAgent resource.
   *
   * @param {string} projectLocationAgentName
   *   A fully-qualified path representing project_location_agent resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromProjectLocationAgentName(projectLocationAgentName: string) {
    return this._pathTemplates.projectLocationAgentPathTemplate.match(
      projectLocationAgentName
    ).location;
  }

  /**
   * Return a fully-qualified projectLocationAgentIntent resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} intent
   * @returns {string} Resource name string.
   */
  projectLocationAgentIntentPath(
    project: string,
    location: string,
    intent: string
  ) {
    return this._pathTemplates.projectLocationAgentIntentPathTemplate.render({
      project,
      location,
      intent,
    });
  }

  /**
   * Parse the project from ProjectLocationAgentIntent resource.
   *
   * @param {string} projectLocationAgentIntentName
   *   A fully-qualified path representing project_location_agent_intent resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectLocationAgentIntentName(
    projectLocationAgentIntentName: string
  ) {
    return this._pathTemplates.projectLocationAgentIntentPathTemplate.match(
      projectLocationAgentIntentName
    ).project;
  }

  /**
   * Parse the location from ProjectLocationAgentIntent resource.
   *
   * @param {string} projectLocationAgentIntentName
   *   A fully-qualified path representing project_location_agent_intent resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromProjectLocationAgentIntentName(
    projectLocationAgentIntentName: string
  ) {
    return this._pathTemplates.projectLocationAgentIntentPathTemplate.match(
      projectLocationAgentIntentName
    ).location;
  }

  /**
   * Parse the intent from ProjectLocationAgentIntent resource.
   *
   * @param {string} projectLocationAgentIntentName
   *   A fully-qualified path representing project_location_agent_intent resource.
   * @returns {string} A string representing the intent.
   */
  matchIntentFromProjectLocationAgentIntentName(
    projectLocationAgentIntentName: string
  ) {
    return this._pathTemplates.projectLocationAgentIntentPathTemplate.match(
      projectLocationAgentIntentName
    ).intent;
  }

  /**
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.knowledgeBasesStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
