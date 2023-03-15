# Proof-of-Concept Medical Device Complaint Tracking dApp

## Team Members
Katrina Siegfried, MS Computer Science candidate, May 2023

## Project Abstract
Under the FDA, there is very strict guidance around complaint handling for medical devices as outlined by 21 CFR 820.198. Medical device complaints must be processed in a timely manner, and with an auditable trail, to ensure that all events are investigated and can be reported to the FDA if needed. Most companies have a quality management system (QMS) which is structured to support compliance for medical device complaint reporting. These complaints are also consumed by other portions of the business outside of the quality compliance groups, such as
* Integration in a product backlog as a bug or feature enhancement request
* For service teams to have up-to-date information and tracking on customer issues and for scheduling service
* For tagging to inventory systems to support regulatory restrictions or awareness of product issues
* Integration with the design history file (DHF) of a product
* Customer-facing personnel may log observations or information outside of complaints which also needs to be tracked

In many instances, the software programs used in the applications listed above likely do not easily interface with one another. This causes issues where the information from a customer complaint is not consistently distributed, updated, and tracked across all different domains, resulting in disrupted information flow.

Additionally, these traditional database programs used for defect tracking are expensive and proprietary. This makes developing interfaces between them and all of the other programs used across the business difficult if not impossible as it requires an agreed interface between many disparate programs. It also serves as a cost barrier for medical device startups.

This project proposes an open-source, FDA compliant, secure, medical device complaint management system powered by the concept of the decentralized ledger as a decentralized application (dApp).

## Objectives
The objective of this project is to provide a proof-of-concept for an open-sourced dApp and set of API's for common consuming programs which is designed to meet the requirements for medical device complaint handling by the FDA. This foundation of well-defined documents and proof-of-concept dApp will provide an artifact to drive futher open-sourced work and discussion on innovations in the medical device community, and an opportunity for a lightning talk topic at a future medical device conference.

## Deliverables
The following deliverables will be produced in support of the project objective.
* Project proposal
* List of product level (PRD) and lower level (LLR) software requirements
* Architectural document outlining the dApp design
* Design document (white paper) outlining how the blockchain and dApp architecture serve to meet the requirements for the FDA regulation 21 CFR 820.198
* Github projects board to track the work throughout the duration of this project as well as future enhancements which were not able to be completed within the scope of this course
* Software bill of materials (BOM) outlining which open-source tools are consumed
* Proof-of-concept blockchain dApp, level of functionality will be scaled time-permitting
* Time permitting, a set of API's for common consuming programs of consumer medical device complaints such as Windchill, Salesforce, SAP
* Presentation for end of semester
* Public Github repository hosting all content listed above

### Timeline
* Week 09 - 2023-03-12
  * Project proposal complete
  * Requirements (PRD and LLR)
  * Set up Github projects board
* Week 10 - 2023-03-19
  * dApp software architecture document
  * Software BOM
* Break   - 2023-03-26
  * Design document to map blockchain architecture to compliance
  * Proof-of-concept blockchain dApp, set up environment and dependencies
* Week 11 - 2023-04-03
  * Design document to map blockchain architecture to compliance
  * Proof-of-concept blockchain dApp, begin
  * Engage class discord to review contract code segment
* Week 12 - 2023-04-09
  * Design document to map blockchain architecture to compliance, complete
  * Proof-of-concept blockchain dApp
  * Set up check-in with professors
* Week 13 - 2023-04-16
  * Proof-of-concept blockchain dApp
  * API's (time permitting)
* Week 14 - 2023-04-23
  * Proof-of-concept blockchain dApp, code complete / wrap up at stopping point
  * Presentation
  * Complete all deliverables
* Week 15 - 2023-04-30
  * Presentation in class
  * Project due

## Unknowns and Risks
The largest unknown at this point is how the debugging and coding iterative cycle will play out on a team with only one person. While working on a team of one has its advantages - quick decision making, no need to debrief others on the business case and context, flexibility to adapt the project schedule around my work needs - there is a risk that some of the technical challenges may be more difficult to overcome. To mitigate this risk, I intend to leverage the course's discord community as I encounter challenging debugging road blocks or complex design issues where I need feedback. I will also engage my classmates in the Discord to help optimize my contract code to minimize the gas fees incurred to help make my proof-of-concept dApp as effiient as possible. 

Additionally, working alone can make it easy to procrastinate or fail to stick to the forecasted schedule. In addition to breaking out the schedule as I have above, I will set up a check-in with the professors around week 12 to ensure I am on track to complete the project as forecasted.

To better support my efforts on this project, it would be helpful to have a way to submit deliverables "along-the-way", so that there would be opportunity for feedback prior to final submission. Not only will this drive a better project submission, but it will help prevent procrastination and schedule slip.

## Helpful Resources
[FDA 21 CFR 820.198](https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/cfrsearch.cfm?fr=820.198)
