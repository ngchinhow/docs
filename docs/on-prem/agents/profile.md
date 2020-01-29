---
title: On-prem Agent - Connection Profiles
date: 2017-02-22 12:00:00 Z
---

# Connection Profiles
A single Workato on-prem agent can be used to connect with multiple on-prem applications. A **connection profile** uniquely identifies each one and contains configuration information required to connect to that application.

 Profiles are configured in the `<INSTALL_HOME>/conf/config.yml`. A config file can contain profiles to a few types of systems:
 - [Databases](#database-profile)
 - [On-prem file systems](#on-prem-files-profile)
 - [SAP](#sap-profile)
 - [Java messaging service](#jms-profile)
 - [Apache Kafka](#apache-kafka-profile)
 - [Active Directory](#active-directory-profile)
 - [HTTP profile](#http-profile)
 - [NTLM](#ntlm-profile)
 - [Command-line scripts](#command-line-scripts-profile)
 - [Extensions](#extensions-profile)

 Additionally, you can configure [proxy servers](/on-prem/agents/proxy.md) for on-prem agents installed in a server with limited internet connectivity.

 A typical config file will look something like this:

```YAML
database:
  profile1:
    ...
  profile2:
    ...

files:
  profile3:
    ...
  profile4:
    ...

jms:
  profile5:
    ...

ldap:
  profile6:
    ...
```

> Do not use spaces or special characters in connection profile names.

## Running your agent
After configuring your connection profiles, you will need to [run your on-prem agent](/on-prem/agents/run.md) on your machine.

## Applying a new configuration
A running on-prem agent automatically applies any changes made to the configuration file. Changes to proxy server settings require you to restart the agent.

## Database profile
Database connection profiles are located in the `database` section of `<INSTALL_HOME>/conf/config.yml`.

A database type is specified either by using the `adapter` property or a complete JDBC URL provided in the `url` property. Using the following `adapter` values for the respective database you are connecting to. The following databases are supported by the on-prem agent - use them as `adapter` values for the respective databases you connect to.

<table class="unchanged rich-diff-level-one">
  <thead>
    <tr>
        <th>Database</th>
        <th>adapter</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Microsoft SQL Server</td>
      <td><code>sqlserver</code></td>
    </tr>
    <tr>
      <td>Oracle Database</td>
      <td><code>oracle</code></td>
    </tr>
    <tr>
      <td>PostgreSQL</td>
      <td><code>postgresql</code></td>
    </tr>
    <tr>
      <td>MySQL</td>
      <td><code>mysql</code></td>
    </tr>
    <tr>
      <td>Other JDBC-compatible database</td>
      <td><code>jdbc</code></td>
    </tr>
  </tbody>
</table>

`port` numbers can be omitted when matching defaults for a given database type.

Here's a sample SQL server configuration for connecting to a specific instance:

```YAML
database:
  sales:
    adapter: sqlserver
    host: localhost
    port: 1433
    database: sales
    username: me
    password: foobar
```

Here's a sample PostgreSQL database using `url` property in the configuration:

```YAML
database:
  sales:
    url: jdbc:postgresql://sales.database:5432/sales
    username: joe
    password: Secret123
    ApplicationName: workato
```

When working with Oracle database, you may be connecting to either an **SID** or **Service**. If you are using **SID**, you can use both ways to define the profile. First, the

Using `adapter` property:

```YAML
database:
  erp:
    adapter: oracle
    host: localhost
    port: 1521
    database: XE
    username: admin
    password: xxx
```

Using `url` property:

```YAML
database:
  erp:
    url: jdbc:oracle:thin:@localhost:1521:XE
    username: admin
    password: xxx
```

When connecting to an Oracle **Service**, use the `url` property:

```YAML
database:
  erp:
    url: jdbc:oracle:thin:@localhost:1521/PROD
    username: admin
    password: xxx
```

### JDBC profile
When creating connection profile to other JDBC-compatible databases, the configuration is special. These profiles require `url` and `driverClass` properties, where `url` is a valid JDBC URL and `driverClass`  provides fully-qualified name of JDBC driver class for the given database. The driver class must be available on the agent's classpath;
note that your agent's classpath can be extended in the `server` section of the configuration file:
```YAML
database:
  tpc:
    url: jdbc:presto://warehouse.intra:8889/tpch
    driverClass: com.facebook.presto.jdbc.PrestoDriver
    adapter: jdbc
    user: my_user
    SSL: false

server:
  classpath: /opt/workato-agent/jdbc
```

## On-prem files profile
Working with on-prem files requires you to define a file system profile in the `files` section.
You need to specify the base folder for file access as it will be used for resolving relative paths. A folder named `HR` in the `C:/Documents/` directory will be configured like this:

```YAML
files:
  hrfiles:
    base: "C:/Documents/HR"
```

In another example, if you wish to provide access to the `employees` folder in the Desktop directory, the configuration will have a file path that looks something like this:

```YAML
files:
  hrfiles:
    base: "/Users/me/Desktop/employees"
```

## SAP profile
SAP connection profile must be defined in the `server` and `sap` section. The `server` section looks like this:

```YAML
server:
  classpath:
    - lib/SAPConnector.jar
    - lib_ext
```

Here, `lib_ext` is the directory where you put the SAP JCo connector libraries. If this directory is not already created, create this directory under the root directory of the OPA and put the SAP JCo connector libraries there.

There are two connection types that the connector supports: `direct` and `messageserver`. Below is the example of `direct` connection type. Use this connection type if SAP system is directly exposed as an application server.

```YAML
server:
  classpath:
    - lib/SAPConnector.jar
    - lib_ext

sap:
  Direct:
  # Sap inbound connection properties
    connection_type: direct
    ashost: 10.30.xx.xx
    client: 800
    user: OSA_DEV
    password: ********
    lang: en
    sysnr: 00
    pool_capacity: 3
    peak_limit: 10
  # Sap outbound connection properties. These must be passed along with inbound properties
    gwhost: 10.30.xx.xx
    gwserv: 3300
    progid: WORKATO
    connection_count: 2
  # Workato Connection properties for advanced users. Often don't need to be changed
    http_connect_timeout: 10000
    http_connection_request_timeout: 10000
    http_socket_timeout: 10000
    cm_max_total: 10
    cm_default_max_per_route: 5
  # Properties for setting IDoc segment fields. Leave blank values if you only use RFC, but do not delete this section
    control_segment:
      SNDPOR: WORKATO
      SNDPRT: LS
      SNDPRN: WORKATO
      RCVPOR: SAPEQ6
      RCVPRT: LS
      RCVPRN: T90CLNT090
    # Property to get IDoc list configured on RCVPRN profile
    # Should be equal to Partner Profile No. specified in SAP transaction WE20
      OUT_RCVPRN: WORKATO
```

Below is the example of `messageserver` connection type. Use this connection type when SAP system is behind message server gateway.

```YAML
server:
  classpath:
    - lib/SAPConnector.jar
    - lib_ext

sap:
  MessageServer:
  # Sap inbound connection properties
    connection_type: messageserver
    user: OSA_DEV
    password: ********
    lang: en
    sysnr: 00
    mshost: 10.30.xx.xx
    msserv: 3600
    r3name: R/3
    client: 800
    group:  PUBLIC
    pool_capacity: 3
    peak_limit: 10
  # Sap outbound connection properties. These must be passed along with inbound properties
    gwhost: 10.30.xx.xx
    gwserv: 3300
    progid: WORKATO
    connection_count: 2
  # Workato Connection properties for advanced users. Often don't need to be changed
    http_connect_timeout: 10000
    http_connection_request_timeout: 10000
    http_socket_timeout: 10000
    cm_max_total: 10
    cm_default_max_per_route: 5
  # Properties for setting IDoc segment fields. Leave blank values if you only use RFC, but do not delete this section  
    control_segment:
      SNDPOR: WORKATO
      SNDPRT: LS
      SNDPRN: WORKATO
      RCVPOR: SAPEQ6
      RCVPRT: LS
      RCVPRN: T90CLNT090
    # Property to get IDoc list configured on RCVPRN profile
      OUT_RCVPRN: WORKATO
```

### How to configure SAP profile properties

The properties below are required if you are connecting directly to SAP Application Server. This will not allow Load Balancer on the SAP side to be enabled:

- **ashost**: SAP host in the format of `xx.xx.xx.xx`. This is the IP Address of the SAP application server you are connecting directly. This can be seen on the SAP Logon Pad which is used to login to your on-premise SAP Application server.

    ![Host](~@img/connectors/sap/ashost.png)

- **client**: The actual client number which is used for connecting to Workato. Use the same one you log into with your SAP Logon Pad. It's always a 3 digit integer.

    ![Client](~@img/connectors/sap/client.png)

The properties below are required if you are connecting to SAP Message Server. The Message Server is responsible for communication between SAP application servers. It passes requests from one application server to another within the system. This will allow Load Balancer on the SAP side to be enabled:

- **mshost**: Message Server host in the format of `xx.xx.xx.xx`. This is the IP Address of the Message Server you are connecting.
- **msserv**: Message Server port.

    `mhost` and `msserv` can be found in SAP Tcode SMMS as shown below:

    ![Message Server Host](~@img/connectors/sap/mhost.png)

- **r3name**: The system ID of the SAP system, e.g. R/3, SQ2. Can be found on the SAP Logon Pad which is used to login to your SAP Application server.

    ![Message Server Host](~@img/connectors/sap/r3name.png)

- **group**: Logical group name of the application servers. Can be found in SAP Tcode SMLG:

    ![Group](~@img/connectors/sap/group.png)

The properties below are required irrespective of the connection type, either Message Server or Application server:

- **user**: SAP RFC user. Using background user and disabling dialog properties are recommended.

    ![User](~@img/connectors/sap/user.png)

- **password**: SAP RFC user password.

    ![Password](~@img/connectors/sap/password.png)

- **lang**: Logon language.

    ![Language](~@img/connectors/sap/language.png)

- **sysnr**: Two digit SAP system number.

    ![System number](~@img/connectors/sap/system-number.png)

- **pool_capacity**: Default to `3`. Maximum number of idle connections that can be kept open for a SAP connection.
- **peak_limit**: Default to `10`. Maximum number of active connections that can be created for SAP simultaneously.

These are required for SAP Outbound Connection properties:

- **gwhost**: SAP Gateway Host, in the number format of `xx.xx.xx.xx`.
- **gwserv**: Gateway server port. Depending on your SAP system's configuration, you will need to input text (e.g. `sapgw`) or number (e.g. `3301`). Test both versions to see which one works with your system.
- **progid**: SAP Program ID configured for Workato.

    The 3 properties above can be found in the SM59 Tcode for the created Workato RFC Destination:

    ![Program ID](~@img/connectors/sap/program-id.png)

- **connection_count**: Default to `2`. The number of parallel connection can be open for outbound sap connection.

These are optional for Workato Connection properties (for advanced users):

- **http_connect_timeout**: Default 10000. Determines the timeout in milliseconds until a connection is established. A timeout value of zero is interpreted as an infinite timeout.
- **http_connection_request_timeout**: Default 10000. Returns the timeout in milliseconds used when requesting a connection from the connection manager. A timeout value of zero is interpreted as an infinite timeout.
- **http_socket_timeout**: Default 10000. Defines the socket timeout in milliseconds, which is the timeout for waiting for data  or, put differently, a maximum period inactivity between two consecutive data packets.
- **cm_max_total**: Default 10. Total number of connections in the connection pool.
- **cm_default_max_per_route**: Default 5. Number of connections in the pool per route.

These are required for SAP IDoc Connection properties (defined to send IDocs to SAP). These can be dynamically overridden with the Workato recipe/mapping:

- **SNDPOR**: Transactional RFC port configured in SAP for Workato.
- **SNDPRT**: Partner profile type.
- **SNDPRN**: Partner profile Name defined for Workato.
- **RCVPOR**: SAP default Receiver Port.
- **RCVPRT**: Receiver Partner profile type.
- **RCVPRN**: Receiver Partner profile type defined for the SAP.

    To find the 6 properties above, send a sample IDoc to the created IDoc configuration in SAP. Proceed to Tcode WE19, open the IDoc number and its control record, then you can find all 6 properties in one place as shown below:

    ![Control segment](~@img/connectors/sap/control-segment.png)

The below property is required to get IDoc dropdown list populated in the Workato Recipe creation UI configured on Receiver partner profile:

- **OUT_RCVPRN**: Receiver Partner profile No. defined for the SAP. Can be the same as **RCVPRN** above for ease of use.

## JMS profile
JMS connection profiles must be defined in the `jms` section. A JMS provider is specified by `provider` property of a connection profile. The following JMS providers are supported by the on-prem agent:

<table class="unchanged rich-diff-level-one">
  <thead>
    <tr>
        <th>Messaging service</th>
        <th>provider</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Amazon Simple Queue Service</td>
      <td><code>amazon-sqs</code> or <code>sqs</code></td>
    </tr>
    <tr>
      <td>Apache ActiveMQ</td>
      <td><code>activemq</code></td>
    </tr>
    <tr>
      <td>Azure Service Bus</td>
      <td><code>custom</code></td>
    </tr>
  </tbody>
</table>

### Amazon SQS
You need the following configuration properties when connecting to Amazon SQS:
```YAML
jms:
  MyAmazonProfile:
    provider: amazon-sqs
    region: <Your Amazon API region, eg 'us-east-2'>
    accessKey: <Your Amazon API access key>
    secretKey: <Your Amazon API secret>
```

Note that you need to make sure your SQS queue is created before sending messages.

### Apache ActiveMQ
For connecting to a running ActiveMQ broker you only need to specify the broker URL:
```YAML
jms:
  MyActiveMQProfile:
    provider: activemq
    url: tcp://localhost:61616
```

ActiveMQ broker cannot be embedded into the agent. Using any `vm://` broker connections is not supported.

### Azure Service Bus
Azure Service Bus uses custom JMS provider. You will need the following configuration properties when connecting to Azure Service Bus:
```YAML
jms:
  azureServiceBus:
    provider: custom
    class: org.apache.qpid.jms.JmsConnectionFactory
    remoteURI: amqps://<host-name>.servicebus.windows.net
    username: <policy-name>
    password: "<primary-key>"
```

Download jar files from [here](https://jar-download.com/artifacts/org.apache.qpid/qpid-jms-client/0.29.0/source-code) and extract it inside *_lib_ext_* folder.

Add the classpath inside the config.yml file. 
```YAML
server:
 classpath: /<path-of-the-agent>/workato-agent/lib_ext
```

## Apache Kafka profile
Kafka connection profiles must be defined in the `kafka` section. You need the following configuration properties when connecting to Kafka:
```YAML
kafka:
  MyKafkaProfile:
    ... connection properties ...
```

You can provide any Kafka [consumer](https://kafka.apache.org/documentation/#producerconfigs) or [producer](https://kafka.apache.org/documentation/#newconsumerconfigs) configuration properties, e.g. `bootstrap.servers` or `batch_size`.

However, some properties are overridden by the on-prem agent and cannot be configured. You will get a warning when trying to redefine a protected property. Some examples of these protected properties:

| Property name | Comment |
|------------------|-------------------------------------------|
| key.serializer | Only `StringSerializer` is supported by agent |
| value.serializer | Only `StringSerializer` is supported by agent |
| key.deserializer | Only `StringSerializer` is supported by agent |
| value.deserializer | Only `StringSerializer` is supported by agent |
| auto.offset.reset | Defined by recipes |
| enable.auto.commit | Defined internally |

Workato Agent also supports the following (non-Kafka) configuration properties:

| Property name | Description |
|------------------|-------------------------------------------|
| timeout | General operation timeout, milliseconds. |
| url | Comma-separated list of server URLs where protocol is either `kafka` or `kafka+ssl`. |
| ssl.truststore | Allows inlining of PEM-encoded truststore for secure connection to Kafka |
| ssl.keystore.key | Allows inlining of private key for secure connection to Kafka |
| ssl.keystore.cert | Allows inlining of client certificate for secure connection to Kafka |

`ssl.*` options above can be used when connecting to Kafka using SSL/TLS and allows you to keep PEM-encoded certificates and private keys inside the `config.yml` file. Any YAML-compatible multiline syntax could be used, for instance:

```YAML
kafka:
  MyKafkaProfile:
    ssl.truststore:
    |
      -----BEGIN CERTIFICATE-----
      502mPNNAYkY4a7Zu84DLCXLFurEa4BhLBqLkzC6WdTrBN9z6Rp/svTIl6VgjSTP6
      .....
      -----END CERTIFICATE-----
```

Note that password-protected private keys cannot be inlined.

## Active Directory profile
Active Directory connection profiles must be defined in the `ldap` section.  Example profile:
```YAML
ldap:
  active_directory_main:
    url: ldaps://acme.ldap.com:636
    username: Administrator
    password: foobar
    base: dc=acme,dc=com
    ssl:
      cert: /path/to/PEM-encoded-certificate-or-trusted-CA-certificate
      trustAll: true
```

<table class="unchanged rich-diff-level-one">
  <thead>
    <tr>
        <th colspan=2 width='25%'>Property name</th>
        <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan=2>
        <b>url</b><br>
        <i>required</i>
      </td>
      <td>
        The URL of the LDAP server to use. The URL should be in the format <code>ldap://myserver.example.com:389</code>.<br><br>
        For SSL access, use the LDAPS protocol. The URL format is in the same format <code>ldaps://myserver.example.com:636</code>.<br><br>
        If fail-over functionality is desired, more than one URL can be specified, separated using comma (,).
      </td>
    </tr>
    <tr>
      <td colspan=2>
        <b>username</b><br>
        <i>required</i>
      </td>
      <td>
        The username (principal) to use when authenticating with the LDAP server. This will usually be the distinguished name of an admin user. For example, <code>cn=Administrator</code> or simply <code>Administrator</code>.
      </td>
    </tr>
    <tr>
      <td colspan=2>
        <b>password</b><br>
        <i>required</i>
      </td>
      <td>The password (credentials) to use when authenticating with the LDAP server</td>
    </tr>
    </tr>
    <tr>
      <td colspan=2>
        <b>base</b><br>
        <i>optional</i>
      </td>
      <td>
        The base DN for all requests. When this attribute has been configured, all <b>Distinguished names</b> supplied to and received from LDAP operations will be relative to this LDAP path. This can significantly simplify working against a large LDAP tree.<br><br>
        However there are several occasions when you will need to have access to the base path. For more information on this, please refer to Obtaining a reference to the base LDAP path.
      </td>
    </tr>
    </tr>
    <tr>
      <td rowspan=4>
        <b>ssl</b><br>
        <i>optional</i>
      </td>
      <td>cert</td>
      <td>Path the PEM encoded certificate or a trusted CA certificate.</td>
    </tr>
    <tr>
      <td>pem</td>
      <td>Full content of a PEM encoded certificate.</td>
    </tr>
    <tr>
      <td>key</td>
      <td>
        Private key for mutual SSL setup. <b>Required</b> if <code>pem</code> is provided.
      </td>
    </tr>
    <tr>
      <td>trustAll</td>
      <td>
        Set to <code>true</code> to enable self-signed certificates.
      </td>
    </tr>
  </tbody>
</table>

## HTTP profile

The `http` configuration section allows configuring agent access to internal HTTPS resources:
```YAML
http:
  trustAll: true
  verifyHost: true
```

The agent may be configured to allow accessing internal HTTPS resources which use self-signed certificates. To enable self-signed certificates set `trustAll` property to `true`.

Normally a server certificate's Common Name (or Subject Alternate Name) field should match the target hostname. If you want the agent to accept server certificates with non-matching hostname, disable hostname verification by setting `verifyHost` property to `false` (defaults to `true`).

## NTLM profile
Certain HTTP resources require NTLM authentication. This can be done using a NTLM connection profile. Here are some example NTLM profiles:
```YAML
ntlm:
  MyNtlmProfile:
    auth: "username:password@domain/workstation"
    base_url: "http://myntlmhost.com"
    cm_default_max_per_route: 15
    cm_max_total: 100
    verifyHost: true
    trustAll: false

  AnotherNtlmProfile:
    auth: "domain/workstation"
    username: "username"
    password: "password"
    base_url: "http://myntlmhost.com"
    cm_default_max_per_route: 15
    cm_max_total: 100
    verifyHost: true
    trustAll: false
```

The following profile properties are supported:

| Property name | Description |
|------------------|-------------------------------------------|
| auth | Full NTLM authentication credentials. This can include username, password, domain and workstation.<br><br>For OPA version 2.4.7 or later, **username** and **password** can be configured separately if they contain special characters like `@` and `/`. |
|username | Username for NTLM authentication.<br>**Only for OPA version 2.4.7 or later** |
|password | Password for NTLM authentication.<br>**Only for OPA version 2.4.7 or later** |
| base_url | The base URL for NTLM resources |
| cm_default_max_per_route | **Optional**. Sets the number of connections per route/host (must be a positive number, default 5) |
| cm_max_total | **Optional**. Sets the maximum number of connections (must be a positive number, default 10) |
| http_connect_timeout | **Optional** The timeout in milliseconds used when requesting a connection (must be a positive number, default 10000) |
| http_connection_request_timeout | **Optional** The timeout in milliseconds until a connection is established (must be a positive number, default 10000) |
| http_socket_timeout | **Optional** The socket timeout in milliseconds, which is the timeout for waiting for data or, put differently, a maximum period inactivity between two consecutive data packets (must be a positive number, default 10000) |
| verifyHost | **Optional**. Specifies whether to enable verification of the host name for SSL/TLS connections (default true) |
| trustAll | **Optional**. Specifies whether trust all certificates for SSL/TLS connections (default false) |

HTTP methods supported for NTLM connections are `GET`, `POST`, `PUT`, `PATCH`, `DELETE` and `HEAD`.

## Command-line scripts profile
This profile allows users to run arbitrary scripts or commands on OPA. The script definition in the config file can have parameters.
When you declare an action, you need to specify the values of the parameters.

An example profile on Unix can look like this:
```YAML
command_line_scripts:
  workday_reports:
    concurrency_limit: 3
    timeout: 30
    scripts:
     copy_file:
       name: Copy file
       command:
         - /bin/cp
         - '{{source_file}}'
         - '{{target_directory}}'
       parameters:
         - { name: source_file }
         - { name: target_directory }           

     append_file_to_another:
       name: Append file to another
       command:
         - bash
         - -c
         - cat {{source_file}} >> {{target_file}}
       parameters:
         # Parameter quoting
         - { name: source_file, quote: '"' }
         # Advanced parameter quoting
         - { name: target_file, quote: { start: '"', end: '"', quote: '"', escape_char: \ } }

     generate_report:
       name: Generate report
       command:
         - python
         - /home/user/script.py
         - --from
         - '{{from_date}}'
         # Conditional fragment
         - { value: --to, if: to_date }
         # Conditional fragment
         - { value: '{{to_date}}', if: to_date }
       parameters:
         - { name: from_date }
         - { name: to_date, schema: { optional: true, control_type: select, pick_list: [01/01/2018, 02/02/2018] } }
```
The command-line script profiles are placed in the `command_line_scripts` section in config.yml. Each profile can contain multiple scripts. The profile configuration properties are as follows:

| Property name | Description |
|------------------|-------------------------------------------|
| scripts | The scripts hash. The value for each key contains the script profile. |
| concurrency_limit | **Optional**. Maximum number of concurrently executed scripts. Defaults to 10 when not provided. After reaching the limit, requests are queued. |
| timeout | **Optional**. Maximum duration(seconds) for each script execution. Defaults to 90 seconds when not provided. |

<br>
The hash key is used as an unique identifier for a script profile. The script configuration properties are as follows:

| Property name | Description |
|------------------|-------------------------------------------|
| name |  Friendly name for the script that will be displayed in the recipe UI. |
| command | The command invocation array. The value of each item can use [Mustache](https://mustache.github.io/mustache.5.html) template variables to substitute the parameter values. |
| parameters | **Optional**. The parameter array (defaults to an empty array). |

<br>
The command invocation element configuration can be just a string, but also can contain these properties:

| Property name | Description |
|------------------|-------------------------------------------|
| value | The command invocation element value. |
| if | The parameter name. If parameter value is empty, this command invocation element is not taken into account. |

<br>
The parameter configuration properties are as follows:

| Property name | Description |
|------------------|-------------------------------------------|
| name | The parameter name. |
| quote | **Optional**. The rules of parameter quoting (defaults to no rules). |
| schema | **Optional**. The parameter schema. |

<br>
The quote configuration can just be a string or have properties. The properties are as follows:

| Property name | Description |
|------------------|-------------------------------------------|
| start | The opening quote character. |
| end | The closing quote character. |
| quote | The quote character in the parameter value to be escaped. |
| escape_char | The escape character. |


If the quote configuration is a string, its value is considered as the value of the `start`, `end` and `quote` properties, and the `escape_char` property value is set to '\\' on Unix and '""' on Windows.

<br>
The parameter schema configuration can have properties as follows:

| Property name | Description |
|------------------|-------------------------------------------|
| optional | **Optional**. The optional flag of the parameter (defaults to false). |
| label | **Optional**. Friendly name for the script, that will be displayed in the recipe UI (defaults to the parameter name). |
| control_type | **Optional**. Can be 'text' or 'select'. If it's 'select', property 'pick_list' should also be defined. Defaults to 'text'. |
| pick_list | **Optional**.  Values for selecting the parameter value. This property should be defined if property 'control_type' has value 'select'. |

## Extensions profile
Working with Java extensions requires you to define an extensions profile. You need a `server` section to define where the `jar` files are located, and an `extensions` section to create individual profiles for the Java classes. A Java extension will be configured like this.
```YAML
server:
  classpath: C:\\Program Files\\Workato Agent\\ext

extensions:
  security:
    controllerClass: com.mycompany.onprem.SecurityExtension
    secret: HA63A3043AMMMM
```

The **server** parameter configuration property is as follows:

| Property name | Description |
|------------------|-------------------------------------------|
| classpath | Specifies the location of user-defined class |

<br>

Each **extensions** profile configuration properties are as follows:

| Property name | Description |
|------------------|-------------------------------------------|
| controllerClass | A required field to inform the OPA which Java class to map the extension to. |
| secret | Optional environment property that is used in the Java class. Multiple properties can be added. |

Find out [how to create a Java extension](/on-prem/agents/extension.md).
