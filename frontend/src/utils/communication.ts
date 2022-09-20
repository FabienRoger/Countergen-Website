import { AugmentedDataset, SampleWithVariations } from "./../types";
import { Dataset, Sample } from "../types";

const backend_url = process.env.REACT_APP_COUNTERGEN_BACK_URL ?? "";

export const getperf = async (input: string, output: string) => {
  const response = await fetch(backend_url + "/get_perf", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: input,
      output: output,
    }),
  });
  const data = await response.json();
  return data;
};

export const getDefaultDataset = async (
  name: string
): Promise<Dataset | undefined> => {
  const response = await fetch(backend_url + "/get_default_ds/" + name);
  console.log(response);
  const data = await response.json();
  const samples = data as Sample[];
  return { samples: samples };
};

export const simpleAugment = async (
  ds: Dataset,
  augmenterName: string
): Promise<AugmentedDataset | undefined> => {
  const response = await fetch(
    backend_url + "/augment/simple/" + augmenterName,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ds.samples),
    }
  );
  const data = await response.json();
  const samples = data as SampleWithVariations[];
  return { samples: samples };
};

export const simpleEvaluate = async (augds: AugmentedDataset) => {
  const response = await fetch(backend_url + "/evaluate/simple", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(augds.samples),
  });
  const data = await response.json();
  return data;
};
