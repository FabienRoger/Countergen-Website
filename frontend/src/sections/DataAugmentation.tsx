import { Button, Chip } from "@mui/material";
import "../App.css";
// import ColabLink from "../components/ColabLink";
// import Collapsable from "../components/Collapsable";
import { AugmentedDataset, Dataset, SampleWithVariations } from "../types";
import { simpleAugment } from "../utils/communication";
import { Card, CardHeader, CardContent } from "@mui/material";

type DataAugmentationProps = {
  dataset: Dataset;
  augdataset: AugmentedDataset | null;
  setAugDataset: (augds: AugmentedDataset) => void;
};

const DataAugmentation = (props: DataAugmentationProps) => {
  const { dataset, augdataset, setAugDataset } = props;

  const augment = () => {
    simpleAugment(dataset, "gender").then((augds) => {
      if (augds !== undefined) setAugDataset(augds);
    });
  };

  return (
    <Card className="section">
      <CardHeader
        className="section-title"
        title="Augment the data"
      ></CardHeader>
      <CardContent className="section-content">
        <Button onClick={augment}>Augment!</Button>
        {/* <Collapsable text={"Upload your data"}>
          <p>Via csv</p>
          <p>Via jsonl</p>
          <p>
            <ColabLink>By using a pythonscript</ColabLink>
          </p>
        </Collapsable> */}
      </CardContent>
      <CardContent className="section-result">
        {augdataset !== null &&
          augdataset.samples.map((s: SampleWithVariations) => {
            return (
              <div className="variation-holder">
                {s.variations.map((v) => (
                  <p>
                    {v.text}
                    {v.categories.map((c) => (
                      <Chip label={c} variant="outlined" />
                    ))}
                  </p>
                ))}
              </div>
            );
          })}
      </CardContent>
    </Card>
  );
};

export default DataAugmentation;
