import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { simpleRpcProvider } from './providers';



export const getContract = (abi: any, address: string, signer?: Signer | Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new Contract(address, abi, signerOrProvider)
}

export const getData = async (abi: any, address: string, user: string, signer?: Signer | Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  const contract = new Contract(address, abi, signerOrProvider);
  const data = await contract.getUserData(user);
  return data;
}

export const getMaxTime = async (abi: any, address: string, signer?: Signer | Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  const contract = new Contract(address, abi, signerOrProvider);
  const data = await contract.getMaxTime();
  return data;
}
