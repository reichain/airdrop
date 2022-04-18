/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Airdrop, AirdropInterface } from "../Airdrop";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_signer",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Claim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "signer",
        type: "address",
      },
    ],
    name: "SetSigner",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "adminWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "hash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "orders",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_signer",
        type: "address",
      },
    ],
    name: "setSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "signer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "valid",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001e8b38038062001e8b83398181016040528101906200003791906200034c565b620000576200004b6200006f60201b60201c565b6200007760201b60201c565b62000068816200013b60201b60201c565b50620004a1565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6200014b6200006f60201b60201c565b73ffffffffffffffffffffffffffffffffffffffff1662000171620002b960201b60201c565b73ffffffffffffffffffffffffffffffffffffffff1614620001ca576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001c190620003df565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036200023c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002339062000451565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fbb10aee7ef5a307b8097c6a7f2892b909ff1736fd24a6a5260640c185f7153b681604051620002ae919062000484565b60405180910390a150565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200031482620002e7565b9050919050565b620003268162000307565b81146200033257600080fd5b50565b60008151905062000346816200031b565b92915050565b600060208284031215620003655762000364620002e2565b5b6000620003758482850162000335565b91505092915050565b600082825260208201905092915050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000620003c76020836200037e565b9150620003d4826200038f565b602082019050919050565b60006020820190508181036000830152620003fa81620003b8565b9050919050565b7f2161646472657373000000000000000000000000000000000000000000000000600082015250565b6000620004396008836200037e565b9150620004468262000401565b602082019050919050565b600060208201905081810360008301526200046c816200042a565b9050919050565b6200047e8162000307565b82525050565b60006020820190506200049b600083018462000473565b92915050565b6119da80620004b16000396000f3fe6080604052600436106100955760003560e01c80637c5b4a37116100595780637c5b4a37146101c05780638da5cb5b146101e957806398231d0714610214578063a85c38ef14610251578063f2fde38b1461028e576100ea565b8063238ac933146100ef578063488a51c01461011a5780636548b7ae146101575780636c19e78314610180578063715018a6146101a9576100ea565b366100ea573373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040516100e09190610e54565b60405180910390a2005b600080fd5b3480156100fb57600080fd5b506101046102b7565b6040516101119190610eb0565b60405180910390f35b34801561012657600080fd5b50610141600480360381019061013c919061107d565b6102dd565b60405161014e919061112f565b60405180910390f35b34801561016357600080fd5b5061017e6004803603810190610179919061114a565b610327565b005b34801561018c57600080fd5b506101a760048036038101906101a291906111cd565b6104df565b005b3480156101b557600080fd5b506101be610645565b005b3480156101cc57600080fd5b506101e760048036038101906101e291906111fa565b6106cd565b005b3480156101f557600080fd5b506101fe6107ed565b60405161020b9190610eb0565b60405180910390f35b34801561022057600080fd5b5061023b60048036038101906102369190611227565b610816565b60405161024891906112a7565b60405180910390f35b34801561025d57600080fd5b50610278600480360381019061027391906111fa565b610857565b604051610285919061112f565b60405180910390f35b34801561029a57600080fd5b506102b560048036038101906102b091906111cd565b610877565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000806102ec87878787610816565b905061031b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16828561096e565b91505095945050505050565b814210610369576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103609061131f565b60405180910390fd5b6002600085815260200190815260200160002060009054906101000a900460ff16156103ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103c19061138b565b60405180910390fd5b6103d733858585856102dd565b610416576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161040d906113f7565b60405180910390fd5b60016002600086815260200190815260200160002060006101000a81548160ff0219169083151502179055503373ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051600060405180830381858888f19350505050158015610488573d6000803e3d6000fd5b503373ffffffffffffffffffffffffffffffffffffffff167f34fcbac0073d7c3d388e51312faf357774904998eeb8fca628b9e6f65ee1cbf785856040516104d1929190611417565b60405180910390a250505050565b6104e7610b53565b73ffffffffffffffffffffffffffffffffffffffff166105056107ed565b73ffffffffffffffffffffffffffffffffffffffff161461055b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105529061148c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036105ca576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105c1906114f8565b60405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507fbb10aee7ef5a307b8097c6a7f2892b909ff1736fd24a6a5260640c185f7153b68160405161063a9190610eb0565b60405180910390a150565b61064d610b53565b73ffffffffffffffffffffffffffffffffffffffff1661066b6107ed565b73ffffffffffffffffffffffffffffffffffffffff16146106c1576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106b89061148c565b60405180910390fd5b6106cb6000610b5b565b565b6106d5610b53565b73ffffffffffffffffffffffffffffffffffffffff166106f36107ed565b73ffffffffffffffffffffffffffffffffffffffff1614610749576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107409061148c565b60405180910390fd5b60008103610755574790505b3373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561079b573d6000803e3d6000fd5b503373ffffffffffffffffffffffffffffffffffffffff167f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a9424364826040516107e29190610e54565b60405180910390a250565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b600061084d858585856040516020016108329493929190611581565b60405160208183030381529060405280519060200120610c1f565b9050949350505050565b60026020528060005260406000206000915054906101000a900460ff1681565b61087f610b53565b73ffffffffffffffffffffffffffffffffffffffff1661089d6107ed565b73ffffffffffffffffffffffffffffffffffffffff16146108f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108ea9061148c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610962576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161095990611641565b60405180910390fd5b61096b81610b5b565b50565b600080600061097d8585610c4f565b915091506000600481111561099557610994611661565b5b8160048111156109a8576109a7611661565b5b1480156109e057508573ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16145b156109f057600192505050610b4c565b6000808773ffffffffffffffffffffffffffffffffffffffff16631626ba7e60e01b8888604051602401610a25929190611718565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050604051610a8f9190611784565b600060405180830381855afa9150503d8060008114610aca576040519150601f19603f3d011682016040523d82523d6000602084013e610acf565b606091505b5091509150818015610ae2575060208151145b8015610b455750631626ba7e60e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191681806020019051810190610b2491906117f3565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b9450505050505b9392505050565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600081604051602001610c329190611898565b604051602081830303815290604052805190602001209050919050565b6000806041835103610c905760008060006020860151925060408601519150606086015160001a9050610c8487828585610cd0565b94509450505050610cc9565b6040835103610cc0576000806020850151915060408501519050610cb5868383610ddc565b935093505050610cc9565b60006002915091505b9250929050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08360001c1115610d0b576000600391509150610dd3565b601b8560ff1614158015610d235750601c8560ff1614155b15610d35576000600491509150610dd3565b600060018787878760405160008152602001604052604051610d5a94939291906118da565b6020604051602081039080840390855afa158015610d7c573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610dca57600060019250925050610dd3565b80600092509250505b94509492505050565b60008060007f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60001b841690506000601b60ff8660001c901c610e1f919061194e565b9050610e2d87828885610cd0565b935093505050935093915050565b6000819050919050565b610e4e81610e3b565b82525050565b6000602082019050610e696000830184610e45565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610e9a82610e6f565b9050919050565b610eaa81610e8f565b82525050565b6000602082019050610ec56000830184610ea1565b92915050565b6000604051905090565b600080fd5b600080fd5b610ee881610e8f565b8114610ef357600080fd5b50565b600081359050610f0581610edf565b92915050565b610f1481610e3b565b8114610f1f57600080fd5b50565b600081359050610f3181610f0b565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610f8a82610f41565b810181811067ffffffffffffffff82111715610fa957610fa8610f52565b5b80604052505050565b6000610fbc610ecb565b9050610fc88282610f81565b919050565b600067ffffffffffffffff821115610fe857610fe7610f52565b5b610ff182610f41565b9050602081019050919050565b82818337600083830152505050565b600061102061101b84610fcd565b610fb2565b90508281526020810184848401111561103c5761103b610f3c565b5b611047848285610ffe565b509392505050565b600082601f83011261106457611063610f37565b5b813561107484826020860161100d565b91505092915050565b600080600080600060a0868803121561109957611098610ed5565b5b60006110a788828901610ef6565b95505060206110b888828901610f22565b94505060406110c988828901610f22565b93505060606110da88828901610f22565b925050608086013567ffffffffffffffff8111156110fb576110fa610eda565b5b6111078882890161104f565b9150509295509295909350565b60008115159050919050565b61112981611114565b82525050565b60006020820190506111446000830184611120565b92915050565b6000806000806080858703121561116457611163610ed5565b5b600061117287828801610f22565b945050602061118387828801610f22565b935050604061119487828801610f22565b925050606085013567ffffffffffffffff8111156111b5576111b4610eda565b5b6111c18782880161104f565b91505092959194509250565b6000602082840312156111e3576111e2610ed5565b5b60006111f184828501610ef6565b91505092915050565b6000602082840312156112105761120f610ed5565b5b600061121e84828501610f22565b91505092915050565b6000806000806080858703121561124157611240610ed5565b5b600061124f87828801610ef6565b945050602061126087828801610f22565b935050604061127187828801610f22565b925050606061128287828801610f22565b91505092959194509250565b6000819050919050565b6112a18161128e565b82525050565b60006020820190506112bc6000830184611298565b92915050565b600082825260208201905092915050565b7f746f6f206c617465000000000000000000000000000000000000000000000000600082015250565b60006113096008836112c2565b9150611314826112d3565b602082019050919050565b60006020820190508181036000830152611338816112fc565b9050919050565b7f616c726561647920636c61696d00000000000000000000000000000000000000600082015250565b6000611375600d836112c2565b91506113808261133f565b602082019050919050565b600060208201905081810360008301526113a481611368565b9050919050565b7f2173696700000000000000000000000000000000000000000000000000000000600082015250565b60006113e16004836112c2565b91506113ec826113ab565b602082019050919050565b60006020820190508181036000830152611410816113d4565b9050919050565b600060408201905061142c6000830185610e45565b6114396020830184610e45565b9392505050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006114766020836112c2565b915061148182611440565b602082019050919050565b600060208201905081810360008301526114a581611469565b9050919050565b7f2161646472657373000000000000000000000000000000000000000000000000600082015250565b60006114e26008836112c2565b91506114ed826114ac565b602082019050919050565b60006020820190508181036000830152611511816114d5565b9050919050565b60008160601b9050919050565b600061153082611518565b9050919050565b600061154282611525565b9050919050565b61155a61155582610e8f565b611537565b82525050565b6000819050919050565b61157b61157682610e3b565b611560565b82525050565b600061158d8287611549565b60148201915061159d828661156a565b6020820191506115ad828561156a565b6020820191506115bd828461156a565b60208201915081905095945050505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600061162b6026836112c2565b9150611636826115cf565b604082019050919050565b6000602082019050818103600083015261165a8161161e565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600081519050919050565b600082825260208201905092915050565b60005b838110156116ca5780820151818401526020810190506116af565b838111156116d9576000848401525b50505050565b60006116ea82611690565b6116f4818561169b565b93506117048185602086016116ac565b61170d81610f41565b840191505092915050565b600060408201905061172d6000830185611298565b818103602083015261173f81846116df565b90509392505050565b600081905092915050565b600061175e82611690565b6117688185611748565b93506117788185602086016116ac565b80840191505092915050565b60006117908284611753565b915081905092915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6117d08161179b565b81146117db57600080fd5b50565b6000815190506117ed816117c7565b92915050565b60006020828403121561180957611808610ed5565b5b6000611817848285016117de565b91505092915050565b600081905092915050565b7f19457468657265756d205369676e6564204d6573736167653a0a333200000000600082015250565b6000611861601c83611820565b915061186c8261182b565b601c82019050919050565b6000819050919050565b61189261188d8261128e565b611877565b82525050565b60006118a382611854565b91506118af8284611881565b60208201915081905092915050565b600060ff82169050919050565b6118d4816118be565b82525050565b60006080820190506118ef6000830187611298565b6118fc60208301866118cb565b6119096040830185611298565b6119166060830184611298565b95945050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061195982610e3b565b915061196483610e3b565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156119995761199861191f565b5b82820190509291505056fea26469706673582212207873caa779b096ec9ee627d186256dcab3128adb57552742778f47f489b5f53964736f6c634300080d0033";

export class Airdrop__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _signer: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Airdrop> {
    return super.deploy(_signer, overrides || {}) as Promise<Airdrop>;
  }
  getDeployTransaction(
    _signer: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_signer, overrides || {});
  }
  attach(address: string): Airdrop {
    return super.attach(address) as Airdrop;
  }
  connect(signer: Signer): Airdrop__factory {
    return super.connect(signer) as Airdrop__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AirdropInterface {
    return new utils.Interface(_abi) as AirdropInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Airdrop {
    return new Contract(address, _abi, signerOrProvider) as Airdrop;
  }
}