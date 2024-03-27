import Link from "next/link";
import DocumentForm from "../forms/DocumentForm";
import Image from "next/image";

import docShape from "@/assets/img/images/document_shape.png";

const doc_data: string[] = [
  "Whitepaper",
  "Token Sale Terms",
  "Presentation",
  "Lightpaper",
];

const DocumentArea = () => {
  return (
    <section id="contact" className="document-area pt-50">
      <div className="container">
        <div className="document-inner-wrap">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title text-center mb-60">
                <h2 className="title">Have Any Questions?</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="document-form-wrap">
                <h4 className="title">Get In Touch Now</h4>
                <DocumentForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentArea;
