"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Estado {
  id: number;
  documentId: string;
  Nome: string;
}

interface Cidade {
  id: number;
  documentId: string;
  Nome: string;
}

interface Pessoa {
  Nome: string;
  Email: string;
  Cidade: Cidade;
  Estado: Estado;
}

const PessoaDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [pessoa, setPessoa] = useState<Pessoa | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPessoa = async () => {
      if (!id || Array.isArray(id)) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/pessoas/${id}?populate=Cidade,Estado`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar dados da pessoa");
        }
        const data = await response.json();
        setPessoa(data.data);
      } catch (error) {
        setError((error as Error).message);
        toast.error("Erro ao carregar os dados da pessoa");
      } finally {
        setLoading(false);
      }
    };

    fetchPessoa();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-indigo-50 min-h-screen flex items-center justify-center p-6">
      <ToastContainer />
      <div className="isolate rounded-[20px] bg-white px-6 py-8 sm:py-12 lg:px-8 w-full max-w-md shadow-lg">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 mb-4">
          Detalhes da Pessoa
        </h2>
        {pessoa && (
          <div className="space-y-4">
            <p>
              <strong>Nome:</strong> {pessoa.Nome}
            </p>
            <p>
              <strong>Email:</strong> {pessoa.Email}
            </p>
            <p>
              <strong>Estado:</strong> {pessoa.Estado?.Nome}{" "}
            </p>
            <p>
              <strong>Cidade:</strong> {pessoa.Cidade?.Nome}{" "}
            </p>
          </div>
        )}
        <button
          onClick={() => router.back()}
          className="mt-6 block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};

export default PessoaDetails;
