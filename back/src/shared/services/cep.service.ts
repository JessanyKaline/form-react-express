import axios from "axios";

export class CepService {
  async validate(cep: string): Promise<boolean> {
    try {
      await axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);
      return true;
    } catch (error) {
      return false;
    }
  }
}
